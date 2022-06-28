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
import { BASE_URL } from '../config/env';

type Device = RGBW2Type | PlugSType;

interface DeviceContextType {
	devices: Device[];
	setDevices: Dispatch<SetStateAction<Device[]>>;
	addDevice: (device: Device) => void;
	updateDevice: (device: Device) => void;
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
			url: `${BASE_URL}/api/rgbw2`,
		});
		const plugS = await axios({
			method: 'get',
			url: `${BASE_URL}/api/plugS`,
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
			url: `${BASE_URL}/api/${device.type}`,
			data: device,
		});

		setDevices([...devices, device]);
	};

	const updateDevice = async (device: Device) => {
		await axios({
			method: 'patch',
			url: `${BASE_URL}/api/${device.type}`,
			data: device,
		});
	};

	const contextValue: DeviceContextType = { devices, setDevices, addDevice, updateDevice };

	return (
		<>
			<DeviceContext.Provider value={contextValue}>{props.children}</DeviceContext.Provider>
		</>
	);
};
