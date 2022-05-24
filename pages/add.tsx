import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { FloatingActionButton } from '../components/ui/floatingActionButton/floatingActionButton';
import { Input } from '../components/ui/input/input';
import { Select } from '../components/ui/select/select';
import DiskFloppy from '../res/images/device-floppy.svg';

const Devices: NextPage = () => {
	const router = useRouter();
	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={true} appBarTitle="Add Device">
			<div>
				<div className="grid gap-4">
					<Select title="Device Type" values={['RGBW2', 'PlugS']} className="h-10 rounded-xl" />
					<Input title="Device Name" className="h-10 rounded-xl" />
					<Input title="Device IP" className="h-10 rounded-xl" />
				</div>
				<FloatingActionButton
					onClick={() => {
						router.push('/devices');
					}}
					className="bg-black absolute right-4 bottom-20"
				>
					<div className="text-zinc-700">
						<DiskFloppy />
					</div>
				</FloatingActionButton>
			</div>
		</LayoutWrapper>
	);
};

export default Devices;
