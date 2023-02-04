import { FC, FormEvent, useEffect, useState } from 'react';
import { Select } from '../ui/select/select';
import { useRouter } from 'next/router';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import { Input } from '../ui/input/input';
import { useDevices } from '../../context/DeviceContext';
import { DeviceFloppy } from 'tabler-icons-react';
import Toast from '../ui/toast/Toast';

export const DeviceForm: FC = () => {
	const { addDevice } = useDevices();
	const [deviceType, setDeviceType] = useState<string>('rgbw2');
	const [deviceName, setDeviceName] = useState<string>('');
	const [deviceIP, setDeviceIP] = useState<string>('');
	const router = useRouter();
	const pattern = '^(?:[0-9]{1,3}.){3}[0-9]{1,3}$';
	const message = 'IP Adress pattern invalid';
	const [visible, setVisible] = useState<boolean>(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!deviceIP.match(pattern)) {
			setVisible(true);
			return;
		}

		try {
			let device: any;
			device = {
				type: deviceType,
				title: deviceName,
				ipAdress: deviceIP,
			};
			addDevice(device);
		} catch (ex) {
			console.log(ex);
		} finally {
			router.push('/devices');
		}
	};

	useEffect(() => {
		if (visible) {
			console.log('visible');
			setTimeout(() => {
				setVisible(false);
			}, 2000);
		}
	}, [visible]);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Toast type="error" showClose visible={visible} setVisible={setVisible}>
					{message}
				</Toast>
				<div className="grid gap-4">
					<Select
						title="Device Type"
						values={['RGBW2', 'PlugS', 'HT']}
						className="h-10 rounded-xl"
						onChange={(e) => {
							setDeviceType(e.currentTarget.value);
						}}
						value={deviceType}
					/>
					<Input
						title="Device Name"
						className="h-10 rounded-xl"
						onChange={(e) => {
							setDeviceName(e.currentTarget.value);
						}}
					/>
					<Input
						title="Device IP"
						className="h-10 rounded-xl"
						onChange={(e) => {
							setDeviceIP(e.currentTarget.value);
						}}
						pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
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
