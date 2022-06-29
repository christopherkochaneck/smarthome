import type { NextPage } from 'next';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { ContextMenuItem } from '../components/contextMenu/components/contextMenuItem';
import { ContextMenu } from '../components/contextMenu/contextMenu';
import { LightCard } from '../components/devices/lightCard';
import { PlugCard } from '../components/devices/plugCard';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { useDevices } from '../context/DeviceContext';

const Devices: NextPage = () => {
	const { devices, deleteDevice } = useDevices();
	const [visible, setVisible] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<string>('');

	return (
		<>
			<ContextMenu visible={visible}>
				<ContextMenuItem
					title="Edit"
					type="contextItem"
					onClick={() => router.push(`/editDevice/${selectedId}`)}
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
			<LayoutWrapper
				showAppbar={true}
				showAppbarIcon={true}
				appBarTitle="Devices"
				href="/add/addDevice"
			>
				<div className="grid gap-4">
					<div className="text-zinc-500 text-center">Lights</div>
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
					<div className="text-zinc-500 text-center">Plugs</div>
					{devices
						.filter((x) => x.type === 'plugS')
						.map((key) => {
							return (
								<>
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
								</>
							);
						})}
				</div>
			</LayoutWrapper>
		</>
	);
};

export default Devices;
