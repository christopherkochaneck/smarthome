import { FC, FormEvent, useEffect, useState } from 'react';
import { Select } from '../ui/select/select';
import { useRouter } from 'next/router';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import { Input } from '../ui/input/input';
import { useDevices } from '../../context/DeviceContext';
import { DeviceFloppy } from 'tabler-icons-react';
import { useToast } from '../../context/ToastContext';
import { uuid } from 'uuidv4';

export const DeviceForm: FC = () => {
	const router = useRouter();
	const { addDevice } = useDevices();
	const { addToast } = useToast();
	const [deviceType, setDeviceType] = useState<string>('rgbw2');
	const [deviceName, setDeviceName] = useState<string>('');
	const [deviceIP, setDeviceIP] = useState<string>('');
	const pattern = '^(?:\\d{1,3}.){3}\\d{1,3}$';
	const [visible, setVisible] = useState<boolean>(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!deviceIP.match(pattern)) {
			addToast({ id: uuid(), autoDismiss: true, message: 'IP Adress is invalid', type: 'error' });
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
			setTimeout(() => {
				setVisible(false);
			}, 2000);
		}
	}, [visible]);

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
