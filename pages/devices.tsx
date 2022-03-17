import type { NextPage } from 'next';
import { LightCard } from '../components/devices/lightCard';
import { PlugCard } from '../components/devices/plugCard';
import { LayoutWrapper } from '../components/layout/layoutWrapper';

const Devices: NextPage = () => {
	return (
		<LayoutWrapper>
			<div className="grid grid-cols-2">
				<div className="p-4">
					<LightCard />
				</div>
				<div className="p-4">
					<LightCard />
				</div>
				<div className="p-4 w-full">
					<PlugCard />
				</div>
			</div>
		</LayoutWrapper>
	);
};

export default Devices;
