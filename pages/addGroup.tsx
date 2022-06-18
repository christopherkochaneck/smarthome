import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { FloatingActionButton } from '../components/ui/floatingActionButton/floatingActionButton';
import { Input } from '../components/ui/input/input';
import DiskFloppy from '../res/images/device-floppy.svg';
import { useDevices } from '../context/DeviceContext';
import { LightSelectionCard } from '../components/devices/selectionCard/lightSelectionCard';
import { PlugSelectionCard } from '../components/devices/selectionCard/PlugSelectionCard';

const AddGroup: NextPage = () => {
	const devices = useDevices();
	const [groupName, setGroupName] = useState<string>('');
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={true} appBarTitle="Add Group">
			<form onSubmit={handleSubmit}>
				<div className="grid gap-4">
					<Input
						title="Group Name"
						className="h-10 rounded-xl"
						onChange={(e) => {
							setGroupName(e.currentTarget.value);
						}}
					/>
					<div className="text-zinc-700 text-center">Select Devices to Add</div>
					{devices.devices.map((key) => {
						if (key.type === 'rgbw2') {
							return <LightSelectionCard id={key.id} key={key.id} name={key.title} />;
						}
						if ((key.type = 'plugS')) {
							return <PlugSelectionCard id={key.id} key={key.id} name={key.title} />;
						}
					})}
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

export default AddGroup;
