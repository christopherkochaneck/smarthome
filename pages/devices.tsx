import type { NextPage } from 'next';
import { LightCard } from '../components/devices/lightCard';
import { PlugCard } from '../components/devices/plugCard';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { useDevices } from '../context/DeviceContext';

const Devices: NextPage = () => {
	const devices = useDevices();
	return (
		<LayoutWrapper>
			<div className="grid grid-cols-2">
				<div className="p-4">
					<LightCard device={devices.shellies.shellyDesk} />
				</div>
				<div className="p-4">
					<LightCard device={devices.shellies.shellyCloset} />
				</div>
				<div className="p-4 w-full">
					<PlugCard state={true} />
				</div>
			</div>
		</LayoutWrapper>
	);
};

export default Devices;
