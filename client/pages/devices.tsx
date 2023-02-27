import type { GetServerSideProps, NextPage } from 'next';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { ContextMenuItem } from '../components/ui/contextMenu/components/contextMenuItem';
import { ContextMenu } from '../components/ui/contextMenu/contextMenu';
import { LightCard } from '../components/devices/lightCard';
import { PlugCard } from '../components/devices/plugCard';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { Backdrop } from '../components/ui/backdrop/Backdrop';
import { useDevices } from '../context/DeviceContext';
import { getSession } from 'next-auth/react';
import { redirectByPermission } from '../util/redirect';
import { CircularColorSelector } from '../components/ui/modals/cirucularColorSelector/CircularColorSelector';
import color from '../interfaces/color';
import { changeColor } from '../util/rgbw2';
import { io } from 'socket.io-client';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: {} };
};

const Devices: NextPage = () => {
	const { devices, deleteDevice } = useDevices();
	const [visible, setVisible] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<string>('');
	const [showColorSelector, setShowColorSelector] = useState<boolean>(false);
	const [selectedColor, setSelectedColor] = useState<color | undefined>();
	const [ipToChangeColor, setIpToChangeColor] = useState<string | undefined>();

	useEffect(() => {
		if (!selectedColor) return;
		if (!ipToChangeColor) return;

		changeColor(ipToChangeColor, selectedColor);
	}, [selectedColor]);

	function handleDelete() {
		const device = devices.find((x) => x._id === selectedId);
		if (device === undefined) {
			return;
		}
		deleteDevice(device);
		setVisible(false);
	}

	function handleDevicePage() {
		const device = devices.find((x) => x._id === selectedId);
		if (device === undefined) {
			return;
		}
		router.push(`http://${device.ipAdress}`);
	}

	function mapRGBW2Devices() {
		return devices
			.filter((x) => x.type === 'rgbw2')
			.map((key) => {
				return (
					<LightCard
						id={key._id!}
						key={key._id}
						ipAdress={key.ipAdress}
						name={key.title}
						onIconPress={() => {
							setIpToChangeColor(key.ipAdress);
							setShowColorSelector(true);
						}}
						onLongPress={() => {
							setSelectedId(key._id!);
							setVisible(true);
						}}
					/>
				);
			});
	}
	function mapPlugSDevices() {
		return devices
			.filter((x) => x.type === 'plugs')
			.map((key) => {
				return (
					<PlugCard
						id={key._id!}
						key={key._id}
						ipAdress={key.ipAdress}
						name={key.title}
						onLongPress={() => {
							setSelectedId(key._id!);
							setVisible(true);
						}}
					/>
				);
			});
	}

	return (
		<>
			{visible && (
				<Backdrop>
					<ContextMenu visible={visible}>
						<ContextMenuItem
							title="Edit"
							type="contextItem"
							onClick={() => router.push(`/editDevice/${selectedId}`)}
						/>
						<ContextMenuItem
							title="Go to Device Page"
							type="contextItem"
							onClick={handleDevicePage}
						/>
						<ContextMenuItem title="Delete" type="cancel" onClick={handleDelete} />
						<ContextMenuItem title="Cancel" type="cancel" onClick={() => setVisible(false)} />
					</ContextMenu>
				</Backdrop>
			)}
			{showColorSelector && (
				<Backdrop
					onClick={() => {
						setShowColorSelector(false);
						setSelectedColor(undefined);
					}}
					className="flex items-center justify-center"
				>
					<CircularColorSelector
						setSelectedColor={setSelectedColor}
						setShowColorSelector={setShowColorSelector}
					/>
				</Backdrop>
			)}
			<LayoutWrapper showAppbar showAppbarIcon appBarTitle="Devices" href="/add/addDevice">
				<div className="grid gap-4">
					<div className="text-white text-center">Lights</div>
					<>{mapRGBW2Devices()}</>
					<div className="text-white text-center">Plugs</div>
					<>{mapPlugSDevices()}</>
				</div>
			</LayoutWrapper>
		</>
	);
};

export default Devices;
