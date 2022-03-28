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
				<div className="text-zinc-500 text-center">Lights</div>
				{Object.keys(devices.rgbw2).map((key) => {
					return <LightCard deviceKey={key} />;
				})}
				<div className="text-zinc-500 text-center">Plugs</div>
				{Object.keys(devices.plugS).map((key) => {
					return <PlugCard deviceKey={key} />;
				})}
			</div>
		</LayoutWrapper>
	);
};

export default Devices;
