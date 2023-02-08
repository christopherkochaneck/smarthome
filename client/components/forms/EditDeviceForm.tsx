import { FC, FormEvent, useEffect, useState } from 'react';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import { Input } from '../ui/input/input';
import { useDevices } from '../../context/DeviceContext';
import { useRouter } from 'next/router';
import { DeviceFloppy } from 'tabler-icons-react';
import { Select } from '../ui/select/select';

export const EditDeviceForm: FC = () => {
	const { devices, updateDevice, addDevice, deleteDevice } = useDevices();
	const [initialDeviceType, setInititalDeviceType] = useState<string>('');
	const [selectedDeviceType, setDeviceType] = useState<string>('');
	const [deviceName, setDeviceName] = useState<string>('');
	const [deviceIP, setDeviceIP] = useState<string>('');
	const router = useRouter();
	const [deviceId, setDeviceId] = useState<string>('');

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			let device: any;
			device = {
				type: initialDeviceType,
				_id: deviceId,
				title: deviceName,
				ipAdress: deviceIP,
			};
			if (initialDeviceType === selectedDeviceType) {
				return updateDevice(device);
			} else {
				deleteDevice(device);
				device.type = selectedDeviceType;
				addDevice(device);
			}
		} catch (ex) {
			console.log(ex);
		} finally {
			router.push('/devices');
		}
	};

	useEffect(() => {
		const query = router.query;
		const id = query.id;

		if (id === undefined) {
			return;
		}
		setDeviceId(id.toString());

		const foundID = devices.find((x) => x._id === id);

		if (foundID === undefined) {
			return;
		}

		setInititalDeviceType(foundID.type);
		setDeviceName(foundID.title);
		setDeviceIP(foundID.ipAdress);
	}, [router.query, devices]);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="grid gap-4">
					<Select
						title="Device Type"
						values={['RGBW2', 'PlugS', 'HT']}
						className="h-10 rounded-xl"
						onChange={(e) => {
							setDeviceType(e.currentTarget.value);
						}}
						value={selectedDeviceType}
					/>
					<Input
						title="Device Name"
						className="h-10 rounded-xl"
						value={deviceName}
						onChange={(e) => {
							setDeviceName(e.currentTarget.value);
						}}
					/>
					<Input
						title="Device IP"
						className="h-10 rounded-xl"
						value={deviceIP}
						onChange={(e) => {
							setDeviceIP(e.currentTarget.value);
						}}
					/>
				</div>
				<FloatingActionButton
					className="bg-black absolute right-4 bottom-20 text-white"
					type="submit"
				>
					<DeviceFloppy className="h-8 w-8" />
				</FloatingActionButton>
			</form>
		</>
	);
};
