import { createContext, FC, useContext, useEffect, useState } from 'react';
import { PlugS } from '../devices/plugS';
import { RGBW2 } from '../devices/rgbw2';
import rgbw2Devices from '../data/rgbw2.json';
import plugSDevices from '../data/plugS.json';

interface DeviceContextType {
	rgbw2: RGBW2[];
	plugS: PlugS[];
	// addListener: (key: string) => void;
	// removeListener: (key: string) => void;
}

const DeviceContext = createContext<DeviceContextType>(undefined!);

const getRGBW2Array = (): RGBW2[] => {
	const rgbw2Array: RGBW2[] = [];
	if (rgbw2Devices.length != 0) {
		rgbw2Devices.map((key) => {
			rgbw2Array.push(new RGBW2(key.ipAdress, key.id));
		});
	}
	return rgbw2Array;
};

const plugSArray = (): PlugS[] => {
	const plugSArray: PlugS[] = [];
	if (plugSDevices.length != 0) {
		plugSDevices.map((key) => {
			plugSArray.push(new PlugS(key.ipAdress, key.id));
		});
	}
	return plugSArray;
};

export function useDevices() {
	return useContext(DeviceContext);
}

const allDevices: DeviceContextType = {
	rgbw2: getRGBW2Array(),
	plugS: plugSArray(),
};

export const DeviceProvider: FC = (props) => {
	const [rgbw2, setRgbw2] = useState<RGBW2[]>(allDevices.rgbw2);
	const [plugS, setPlugS] = useState<PlugS[]>(allDevices.plugS);

	// const [activeDevices, setActiveDevices] = useState<string[]>([]);
	// const addListener = (key: string) => {
	// 	if (!activeDevices.includes(key)) {
	// 		activeDevices.push(key);
	// 		setActiveDevices(activeDevices);
	// 	}
	// };
	// const removeListener = (key: string) => {
	// 	if (activeDevices.includes(key)) {
	// 		const filteredDevices = activeDevices.filter((x) => x !== key);
	// 		setActiveDevices(filteredDevices);
	// 	}
	// };

	useEffect(() => {
		const fetchData = async () => {
			Object.keys(allDevices).map(async (key) => {
				try {
					if (key === 'rgbw2') {
						Object.keys(rgbw2).map((key) => {
							rgbw2[key].initialize();
							setRgbw2({ ...allDevices.rgbw2 });
						});
					} else if (key === 'plugS') {
						Object.keys(plugS).map((key) => {
							plugS[key].initialize();
							setPlugS({ ...allDevices.plugS });
						});
					}
				} catch (error) {}
			});
		};

		const interval = setInterval(() => {
			fetchData();
		}, 150);
		return () => {
			clearInterval(interval);
		};
	}, []);

	const contextValue: DeviceContextType = { rgbw2, plugS };
	return (
		<>
			<DeviceContext.Provider value={contextValue}>{props.children}</DeviceContext.Provider>
		</>
	);
};
