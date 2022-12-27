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
import { HTType } from '../types/HTType';

import axios from 'axios';
import { BASE_URL } from '../config/env';

type Device = RGBW2Type | PlugSType | HTType;

interface DeviceContextType {
	devices: Device[];
	setDevices: Dispatch<SetStateAction<Device[]>>;
	addDevice: (device: Device) => void;
	updateDevice: (device: Device) => void;
	deleteDevice: (device: Device) => void;
}

interface Props {
	children?: React.ReactNode;
}

const DeviceContext = createContext<DeviceContextType>(undefined!);

export function useDevices() {
	return useContext(DeviceContext);
}

export const DeviceProvider: FC<Props> = (props) => {
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
		const ht = await axios({ method: 'get', url: `${BASE_URL}/api/ht` });
		setDevices([
			...rgbw2.data.map((x: any) => ({ type: 'rgbw2', ...x })),
			...plugS.data.map((x: any) => ({ type: 'plugS', ...x })),
			...ht.data.map((x: any) => ({ type: 'ht', ...x })),
		]);
	};
	useEffect(() => {
		fetchData();
	}, []);

	const addDevice = async (device: Device) => {
		try {
			await axios({
				method: 'post',
				url: `${BASE_URL}/api/${device.type}`,
				data: device,
			});

			setDevices([...devices, device]);
		} catch (err) {}
	};

	const updateDevice = async (device: Device) => {
		await axios({
			method: 'patch',
			url: `${BASE_URL}/api/${device.type}`,
			data: device,
		});

		const index = devices.findIndex((x) => x.id === device.id);

		devices[index] = device;

		setDevices([...devices]);
	};

	const deleteDevice = async (device: Device) => {
		const index = devices.findIndex((x) => x.id === device.id);

		devices.splice(index, 1);

		await axios({
			method: 'delete',
			url: `${BASE_URL}/api/${device.type}`,
			data: device,
		});

		setDevices([...devices]);
	};

	const contextValue: DeviceContextType = {
		devices,
		setDevices,
		addDevice,
		updateDevice,
		deleteDevice,
	};

	return (
		<>
			<DeviceContext.Provider value={contextValue}>{props.children}</DeviceContext.Provider>
		</>
	);
};
