import type { NextPage } from 'next';
import { LightCard } from '../components/devices/lightCard';
import { PlugCard } from '../components/devices/plugCard';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { useDevices } from '../context/DeviceContext';

const Devices: NextPage = () => {
	const devices = useDevices();
	return (
		<LayoutWrapper>
			<div className="grid gap-4">
				<LightCard deviceKey="shellyDesk" />
				<LightCard deviceKey="shellyCloset" />
				<PlugCard deviceKey="plug" />
			</div>
		</LayoutWrapper>
	);
};

export default Devices;
