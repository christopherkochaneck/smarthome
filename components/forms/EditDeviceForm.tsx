import { FC, FormEvent, useEffect, useState } from 'react';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import { Input } from '../ui/input/input';
import DeviceFloppy from '../../res/images/device-floppy.svg';
import { useDevices } from '../../context/DeviceContext';
import { useRouter } from 'next/router';
import { RGBW2Type } from '../../types/RGBW2Type';
import { PlugSType } from '../../types/PlugSType';
import { v4 as uuidv4 } from 'uuid';
import { RGBW2 } from '../../devices/rgbw2';

export const EditDeviceForm: FC = () => {
	const devices = useDevices();
	const [device, setDevice] = useState<RGBW2Type | PlugSType>();
	const [deviceType, setDeviceType] = useState<string>('');
	const [deviceName, setDeviceName] = useState<string>('');
	const [deviceIP, setDeviceIP] = useState<string>('');
	const router = useRouter();
	const [deviceId, setDeviceId] = useState<string>('');

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			let device: RGBW2Type | PlugSType;
			if (deviceType === 'rgbw2') {
				device = {
					type: 'rgbw2',
					id: deviceId,
					title: deviceName,
					ipAdress: deviceIP,
				};
				return devices.updateDevice(device);
			}
			if (deviceType === 'plugs') {
				device = {
					type: 'plugS',
					id: deviceId,
					title: deviceName,
					ipAdress: deviceIP,
				};
				return devices.updateDevice(device);
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

		if (id == undefined) {
			return;
		}
		setDeviceId(id.toString());

		const foundID = devices.devices.find((x) => x.id === id);

		if (foundID == undefined) {
			return;
		}

		setDeviceType(foundID.type);
		setDeviceName(foundID.title);
		setDeviceIP(foundID.ipAdress);
	}, []);

	useEffect(() => {
		let foundDevice = devices.devices.find((x) => x.id === deviceId);

		setDevice(foundDevice);
	}, [deviceId]);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="grid gap-4">
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
					className="bg-black absolute right-4 bottom-20 text-zinc-700"
					type="submit"
				>
					<DeviceFloppy />
				</FloatingActionButton>
			</form>
		</>
	);
};
