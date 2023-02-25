import type { GetServerSideProps, NextPage } from 'next';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { ContextMenuItem } from '../components/ui/contextMenu/components/contextMenuItem';
import { ContextMenu } from '../components/ui/contextMenu/contextMenu';
import { GroupCard } from '../components/groups/GroupCard';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { SceneCard } from '../components/scenes/SceneCard';
import { useGroups } from '../context/GroupContext';
import { useScenes } from '../context/SceneContext';
import { Backdrop } from '../components/ui/backdrop/Backdrop';
import { getSession } from 'next-auth/react';
import { redirectByPermission } from '../util/redirect';
import color from '../interfaces/color';
import { GroupType } from '../types/GroupType';
import { CircularColorSelector } from '../components/ui/modals/cirucularColorSelector/CircularColorSelector';
import { useDevices } from '../context/DeviceContext';
import { changeColor } from '../util/rgbw2';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: {} };
};

const Groups: NextPage = () => {
	const { groups, deleteGroup } = useGroups();
	const { devices } = useDevices();
	const { scenes, deleteScene } = useScenes();
	const [visible, setVisible] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<string>('');
	const [showColorSelector, setShowColorSelector] = useState<boolean>(false);
	const [selectedColor, setSelectedColor] = useState<color | undefined>(undefined);
	const [groupToChangeColor, setGroupToChangeColor] = useState<GroupType | undefined>(undefined);

	useEffect(() => {
		if (!groupToChangeColor) return;
		if (!selectedColor) return;
		const group = groups.find((x) => x._id === groupToChangeColor._id);

		if (!group) return;

		const groupIds = group.ids;
		for (let index = 0; index < groupIds.length; index++) {
			const id = groupIds[index];
			const device = devices.find((x) => x._id === id);
			if (!device) return;
			changeColor(device.ipAdress, selectedColor);
		}
	}, [selectedColor]);

	const handleEdit = () => {
		const group = groups.find((x) => x._id === selectedId);
		if (group !== undefined) {
			return router.push(`/editGroup/${selectedId}`);
		}

		const scene = scenes.find((x) => x._id === selectedId);
		if (scene !== undefined) {
			return router.push(`/editScene/${selectedId}`);
		}
	};

	const handleDelete = () => {
		const group = groups.find((x) => x._id === selectedId);
		if (group !== undefined) {
			deleteGroup(group);
			setVisible(false);
		}

		const scene = scenes.find((x) => x._id === selectedId);
		if (scene !== undefined) {
			deleteScene(scene);
			setVisible(false);
		}
	};

	const mapGroups = () => {
		return groups.map((key) => {
			return (
				<GroupCard
					groupID={key._id}
					groupName={key.name}
					title={key.name}
					key={key.name}
					onLightIconPress={() => setGroupToChangeColor(key)}
					onLongPress={() => {
						setVisible(true);
						setSelectedId(key._id);
					}}
				/>
			);
		});
	};

	const mapScenes = () => {
		return scenes.map((key) => {
			return (
				<SceneCard
					name={key.name}
					sceneID={key._id!}
					key={key._id}
					onLongPress={() => {
						setVisible(true);
						setSelectedId(key._id!);
					}}
				/>
			);
		});
	};

	return (
		<>
			{visible && (
				<Backdrop>
					<ContextMenu visible={visible}>
						<ContextMenuItem title="Edit" type="contextItem" onClick={handleEdit} />
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
			<LayoutWrapper showAppbar showAppbarIcon appBarTitle="Groups" href="/grouping">
				<div className="grid gap-4">
					<div className="text-white text-center">Groups</div>
					<>{mapGroups()}</>
					<div className="text-white text-center">Scenes</div>
					<div className="grid grid-cols-2 gap-4">
						<>{mapScenes()}</>
					</div>
				</div>
			</LayoutWrapper>
		</>
	);
};

export default Groups;
