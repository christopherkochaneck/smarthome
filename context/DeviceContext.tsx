import { createContext, FC, useContext, useEffect, useState } from 'react';
import { RGBW2 } from '../devices/rgbw2';

type DeviceContextType = {
	shellies: {
		[key: string]: RGBW2;
	};
	addListener: (key: string) => void;
	removeListener: (key: string) => void;
};

const DeviceContext = createContext<DeviceContextType>(undefined!);

export function useDevices() {
	return useContext(DeviceContext);
}

const allDevices: { [key: string]: RGBW2 } = {
	shellyDesk: new RGBW2('192.168.1.119'),
	shellyCloset: new RGBW2('192.168.1.118'),
};

export const DeviceProvider: FC = (props) => {
	const [activeDevices, setActiveDevices] = useState<string[]>([]);
	const addListener = (key: string) => {
		if (!activeDevices.includes(key)) {
			activeDevices.push(key);
			setActiveDevices(activeDevices);
		}
	};
	const removeListener = (key: string) => {
		if (activeDevices.includes(key)) {
			const filteredDevices = activeDevices.filter((x) => x !== key);
			setActiveDevices(filteredDevices);
		}
	};

	const [shellies, setShellies] = useState<{
		[key: string]: RGBW2;
	}>(allDevices);

	useEffect(() => {
		const fetchData = async () => {
			Object.keys(allDevices)
				// .filter((x) => allDevices.includes(x))
				.map(async (key) => {
					try {
						shellies[key].initialize();
						setShellies({ ...allDevices });
					} catch (error) {
						console.error(error);
					}
				});
		};

		const interval = setInterval(() => {
			fetchData();
		}, 500);
		return () => {
			clearInterval(interval);
		};
	}, []);

	const contextValue: DeviceContextType = { shellies, addListener, removeListener };
	return (
		<>
			<DeviceContext.Provider value={contextValue}>{props.children}</DeviceContext.Provider>
		</>
	);
};
