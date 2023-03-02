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
import { useSession } from 'next-auth/react';

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
	const session = useSession();
	const [devices, setDevices] = useState<Device[]>([]);

	const fetchData = async () => {
		const devices = await axios({
			method: 'get',
			url: `${BASE_URL}/api/device`,
			headers: { Authorization: session.data?.jwt! },
		});
		setDevices([...devices.data.map((x: any) => ({ type: x.type, ...x }))]);
	};
	useEffect(() => {
		if (!session.data) return;
		fetchData();
	}, [session]);

	const contextValue: DeviceContextType = useMemo(() => {
		const addDevice = async (device: Device) => {
			try {
				const res = await axios({
					method: 'post',
					url: `${BASE_URL}/api/device`,
					headers: { Authorization: session.data?.jwt! },
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
				url: `${BASE_URL}/api/device/${device._id}`,
				headers: { Authorization: session.data?.jwt! },
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
				url: `${BASE_URL}/api/device/${device._id}`,
				headers: { Authorization: session.data?.jwt! },
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
