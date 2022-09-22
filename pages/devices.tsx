import type { NextPage } from 'next';
import router from 'next/router';
import { useState } from 'react';
import { ContextMenuItem } from '../components/ui/contextMenu/components/contextMenuItem';
import { ContextMenu } from '../components/ui/contextMenu/contextMenu';
import { LightCard } from '../components/devices/lightCard';
import { PlugCard } from '../components/devices/plugCard';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { Backdrop } from '../components/ui/backdrop/Backdrop';
import { useDevices } from '../context/DeviceContext';

const Devices: NextPage = () => {
	const { devices, deleteDevice } = useDevices();
	const [visible, setVisible] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<string>('');

	return (
		<>
			<Backdrop visible={visible} onClick={() => setVisible(false)} />
			<ContextMenu visible={visible}>
				<ContextMenuItem
					title="Edit"
					type="contextItem"
					onClick={() => router.push(`/editDevice/${selectedId}`)}
				/>
				<ContextMenuItem
					title="Go to Device Page"
					type="contextItem"
					onClick={() => {
						const device = devices.find((x) => x.id === selectedId);
						if (device === undefined) {
							return;
						}
						router.push(`http://${device.ipAdress}`);
					}}
				/>
				<ContextMenuItem
					title="Delete"
					type="cancel"
					onClick={() => {
						const device = devices.find((x) => x.id === selectedId);
						if (device == undefined) {
							return;
						}
						deleteDevice(device);
						setVisible(false);
					}}
				/>
				<ContextMenuItem title="Cancel" type="cancel" onClick={() => setVisible(false)} />
			</ContextMenu>
			<LayoutWrapper showAppbar showAppbarIcon appBarTitle="Devices" href="/add/addDevice">
				<div className="grid gap-4">
					<div className="text-white text-center">Lights</div>
					{devices
						.filter((x) => x.type === 'rgbw2')
						.map((key) => {
							return (
								<LightCard
									id={key.id}
									key={key.id}
									ipAdress={key.ipAdress}
									name={key.title}
									onLongPress={() => {
										setSelectedId(key.id);
										setVisible(true);
									}}
								/>
							);
						})}
					<div className="text-white text-center">Plugs</div>
					{devices
						.filter((x) => x.type === 'plugS')
						.map((key) => {
							return (
								<PlugCard
									id={key.id}
									key={key.id}
									ipAdress={key.ipAdress}
									name={key.title}
									onLongPress={() => {
										setSelectedId(key.id);
										setVisible(true);
									}}
								/>
							);
						})}
				</div>
			</LayoutWrapper>
		</>
	);
};

export default Devices;
