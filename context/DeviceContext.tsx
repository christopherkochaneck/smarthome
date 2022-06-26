import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { RGBW2Type } from '../types/RGBW2Type';
import { PlugSType } from '../types/PlugSType';
import axios from 'axios';

type Device = RGBW2Type | PlugSType;

interface DeviceContextType {
	devices: Device[];
	setDevices: Dispatch<SetStateAction<Device[]>>;
	addDevice: (device: Device) => void;
}

const DeviceContext = createContext<DeviceContextType>(undefined!);

export function useDevices() {
	return useContext(DeviceContext);
}

export const DeviceProvider: FC = (props) => {
	const [devices, setDevices] = useState<Device[]>([]);

	const fetchData = async () => {
		const rgbw2 = await axios({
			method: 'get',
			url: `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_ ?? 'http://localhost:3000'}/api/rgbw2`,
		});
		const plugS = await axios({
			method: 'get',
			url: `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'}/api/plugS`,
		});
		setDevices([
			...rgbw2.data.map((x: any) => ({ type: 'rgbw2', ...x })),
			...plugS.data.map((x: any) => ({ type: 'plugS', ...x })),
		]);
	};
	useEffect(() => {
		fetchData();
	}, []);

	const addDevice = async (device: Device) => {
		await axios({
			method: 'post',
			url: `${process.env.NEXT_PUBLIC_API_URL}/api/${device.type}`,
			data: device,
		});

		setDevices([...devices, device]);
	};

	const contextValue: DeviceContextType = { devices, setDevices, addDevice };

	return (
		<>
			<DeviceContext.Provider value={contextValue}>{props.children}</DeviceContext.Provider>
		</>
	);
};
