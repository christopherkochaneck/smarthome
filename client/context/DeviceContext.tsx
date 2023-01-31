import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { RGBW2Type } from '../types/RGBW2Type';
import { PlugSType } from '../types/PlugSType';
import { HTType } from '../types/HTType';
import axios from 'axios';
import { BASE_URL } from '../config/env';
import { Device } from '../types/Device';

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
		setDevices([
			...rgbw2.data.map((x: any) => ({ type: 'rgbw2', ...x })),
			...plugS.data.map((x: any) => ({ type: 'plugS', ...x })),
		]);
	};
	useEffect(() => {
		fetchData();
	}, []);

	const contextValue: DeviceContextType = useMemo(() => {
		const addDevice = async (device: Device) => {
			try {
				const res = await axios({
					method: 'post',
					url: `${BASE_URL}/api/${device.type}`,
					data: device,
				});

				let createdDevice: RGBW2Type | PlugSType | HTType = {
					_id: res.data._id,
					type: device.type,
					ipAdress: res.data.ipAdress,
					title: res.data.title,
				};

				setDevices([...devices, createdDevice]);
			} catch (err) {}
		};

		const updateDevice = async (device: Device) => {
			await axios({
				method: 'patch',
				url: `${BASE_URL}/api/${device.type}/${device._id}`,
				data: device,
			});

			const index = devices.findIndex((x) => x._id === device._id);

			devices[index] = device;

			setDevices([...devices]);
		};

		const deleteDevice = async (device: Device) => {
			const index = devices.findIndex((x) => x._id === device._id);

			devices.splice(index, 1);

			await axios({
				method: 'delete',
				url: `${BASE_URL}/api/${device.type}/${device._id}`,
			});

			setDevices([...devices]);
		};
		return {
			devices,
			setDevices,
			addDevice,
			updateDevice,
			deleteDevice,
		};
	}, [devices, setDevices]);

	return (
		<>
			<DeviceContext.Provider value={contextValue}>{props.children}</DeviceContext.Provider>
		</>
	);
};
