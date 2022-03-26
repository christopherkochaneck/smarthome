import { createContext, FC, useContext, useEffect, useState } from 'react';
import { PlugS } from '../devices/plugS';
import { RGBW2 } from '../devices/rgbw2';

interface DeviceContextType {
	rgbw2: {
		[key: string]: RGBW2;
	};
	plugS: { [key: string]: PlugS };
	// addListener: (key: string) => void;
	// removeListener: (key: string) => void;
}

const DeviceContext = createContext<DeviceContextType>(undefined!);

export function useDevices() {
	return useContext(DeviceContext);
}

const allDevices: DeviceContextType = {
	rgbw2: { shellyDesk: new RGBW2('192.168.1.119'), shellyCloset: new RGBW2('192.168.1.118') },
	plugS: { plug: new PlugS('192.168.1.168') },
};

export const DeviceProvider: FC = (props) => {
	const [rgbw2, setRgbw2] = useState<{ [key: string]: RGBW2 }>(allDevices.rgbw2);
	const [plugS, setPlugS] = useState<{ [key: string]: PlugS }>(allDevices.plugS);

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
				} catch (error) {
					console.error(error);
				}
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
