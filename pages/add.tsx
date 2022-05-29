import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { FloatingActionButton } from '../components/ui/floatingActionButton/floatingActionButton';
import { Input } from '../components/ui/input/input';
import { Select } from '../components/ui/select/select';
import DiskFloppy from '../res/images/device-floppy.svg';
import { v4 as uuidv4 } from 'uuid';

const Devices: NextPage = () => {
	const [deviceType, setDeviceType] = useState<string>('rgbw2');
	const [deviceName, setDeviceName] = useState<string>('');
	const [deviceIP, setDeviceIP] = useState<string>('');
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(deviceType);

		try {
			if (deviceType === 'rgbw2') {
				await axios({
					method: 'post',
					url: 'http://localhost:3000/api/rgbw2',
					data: {
						id: uuidv4(),
						title: deviceName,
						ipAdress: deviceIP,
					},
				});
			}
			if (deviceType === 'plugs') {
				await axios({
					method: 'post',
					url: 'http://localhost:3000/api/plugS',
					data: {
						id: uuidv4(),
						title: deviceName,
						ipAdress: deviceIP,
					},
				});
			}
		} catch (ex) {
			console.log(ex);
		} finally {
			router.push('/devices');
		}
	};

	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={true} appBarTitle="Add Device">
			<form onSubmit={handleSubmit}>
				<div className="grid gap-4">
					<Select
						title="Device Type"
						values={['RGBW2', 'PlugS']}
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
					className="bg-black absolute right-4 bottom-20 text-zinc-700"
					type="submit"
				>
					<DiskFloppy />
				</FloatingActionButton>
			</form>
		</LayoutWrapper>
	);
};

export default Devices;
