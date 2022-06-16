import type { GetStaticProps, NextPage } from 'next';
import { LightCard } from '../components/devices/lightCard';
import { PlugCard } from '../components/devices/plugCard';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { useDevices } from '../context/DeviceContext';

const Devices: NextPage = () => {
	const { devices } = useDevices();

	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={true} appBarTitle="Devices">
			<div className="grid gap-4">
				<div className="text-zinc-500 text-center">Lights</div>
				{devices
					.filter((x) => x.type === 'rgbw2')
					.map((key) => {
						return <LightCard id={key.id} key={key.id} ipAdress={key.ipAdress} name={key.title} />;
					})}
				<div className="text-zinc-500 text-center">Plugs</div>
				{devices
					.filter((x) => x.type === 'plugS')
					.map((key) => {
						return <PlugCard id={key.id} key={key.id} ipAdress={key.ipAdress} name={key.title} />;
					})}
			</div>
		</LayoutWrapper>
	);
};

export default Devices;
