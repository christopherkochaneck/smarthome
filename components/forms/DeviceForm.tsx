import { FC } from 'react';
import { Select } from '../ui/select/select';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { FloatingActionButton } from '../../components/ui/floatingActionButton/floatingActionButton';
import { Input } from '../../components/ui/input/input';
import DiskFloppy from '../../res/images/device-floppy.svg';
import { v4 as uuidv4 } from 'uuid';
import { useDevices } from '../../context/DeviceContext';
import { RGBW2Type } from '../../types/RGBW2Type';
import { PlugSType } from '../../types/PlugSType';

export const DeviceForm: FC = () => {
	const devices = useDevices();
	const [deviceType, setDeviceType] = useState<string>('rgbw2');
	const [deviceName, setDeviceName] = useState<string>('');
	const [deviceIP, setDeviceIP] = useState<string>('');
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			let device: RGBW2Type | PlugSType;
			if (deviceType === 'rgbw2') {
				device = {
					type: 'rgbw2',
					id: uuidv4(),
					title: deviceName,
					ipAdress: deviceIP,
				};
				devices.addDevice(device);
			}
			if (deviceType === 'plugs') {
				device = {
					type: 'plugS',
					id: uuidv4(),
					title: deviceName,
					ipAdress: deviceIP,
				};
				devices.addDevice(device);
				return;
			}
		} catch (ex) {
			console.log(ex);
		} finally {
			router.push('/devices');
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="grid gap-4">
					<Select
						title="Device Type"
						values={['RGBW2', 'PlugS']}
						className="h-10 rounded-xl"
						onChange={(e) => {
							setDeviceType(e.currentTarget.value.trim());
						}}
						value={deviceType}
					/>
					<Input
						title="Device Name"
						className="h-10 rounded-xl"
						onChange={(e) => {
							setDeviceName(e.currentTarget.value.trim());
						}}
					/>
					<Input
						title="Device IP"
						className="h-10 rounded-xl"
						onChange={(e) => {
							setDeviceIP(e.currentTarget.value.trim());
						}}
					/>
				</div>
				<FloatingActionButton
					className="bg-black absolute right-4 bottom-20 text-zinc-700"
					type="submit"
				>
					<DiskFloppy />
				</FloatingActionButton>
			</form>
		</>
	);
};