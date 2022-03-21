import { createContext, ReactNode, useContext } from 'react';
import { RGBW2 } from '../devices/rgbw2';

type DeviceContextType = {
	shellies: { [key: string]: RGBW2 };
};

const DeviceContextDefaultValues: DeviceContextType = {
	shellies: {},
};

const DeviceContext = createContext<DeviceContextType>(DeviceContextDefaultValues);

export function useDevices() {
	return useContext(DeviceContext);
}

type Props = {
	children: ReactNode;
};

export function DeviceProvider({ children }: Props) {
	const shellies: { [key: string]: RGBW2 } = {
		shellyDesk: new RGBW2('192.168.1.119'),
		shellyCloset: new RGBW2('192.168.1.118'),
	};

	const contextValue: DeviceContextType = { shellies };
	return (
		<>
			<DeviceContext.Provider value={contextValue}>{children}</DeviceContext.Provider>
		</>
	);
}
