import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { LightCard } from '../components/devices/lightCard';
import { PlugCard } from '../components/devices/plugCard';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { useDevices } from '../context/DeviceContext';
import { PlugS } from '../devices/plugS';
import { RGBW2 } from '../devices/rgbw2';

const Devices: NextPage = () => {
	const devices = useDevices();
	const [rgbw2, setRgbw2] = useState<RGBW2[]>(devices.rgbw2);
	const [plugS, setPlugS] = useState<PlugS[]>(devices.plugS);

	useEffect(() => {
		setRgbw2(devices.rgbw2);
		setPlugS(devices.plugS);
	}, [devices]);

	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={true} appBarTitle="Devices">
			<div className="grid gap-4">
				<div className="text-zinc-500 text-center">Lights</div>
				{Object.keys(rgbw2).map((key) => {
					return <LightCard id={key} key={key} />;
				})}
				<div className="text-zinc-500 text-center">Plugs</div>
				{Object.keys(plugS).map((key) => {
					return <PlugCard id={key} key={key} />;
				})}
			</div>
		</LayoutWrapper>
	);
};

export default Devices;
