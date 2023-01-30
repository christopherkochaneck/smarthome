import { FC, FormEvent, useState } from 'react';
import { Select } from '../ui/select/select';
import { useRouter } from 'next/router';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import { Input } from '../ui/input/input';
import { useDevices } from '../../context/DeviceContext';
import { RGBW2Type } from '../../types/RGBW2Type';
import { PlugSType } from '../../types/PlugSType';
import { HTType } from '../../types/HTType';
import { DeviceFloppy } from 'tabler-icons-react';

export const DeviceForm: FC = () => {
	const { addDevice } = useDevices();
	const [deviceType, setDeviceType] = useState<string>('rgbw2');
	const [deviceName, setDeviceName] = useState<string>('');
	const [deviceIP, setDeviceIP] = useState<string>('');
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			let device: RGBW2Type | PlugSType | HTType;
			if (deviceType === 'rgbw2') {
				device = {
					type: 'rgbw2',
					title: deviceName,
					ipAdress: deviceIP,
				};
				addDevice(device);
			}
			if (deviceType === 'plugs') {
				device = {
					type: 'plugS',
					title: deviceName,
					ipAdress: deviceIP,
				};
				addDevice(device);
				return;
			}
			if (deviceType === 'ht') {
				device = {
					type: 'ht',
					title: deviceName,
					ipAdress: deviceIP,
				};
				addDevice(device);
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
