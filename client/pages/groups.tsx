import type { NextPage } from 'next';
import router from 'next/router';
import { useState } from 'react';
import { ContextMenuItem } from '../components/ui/contextMenu/components/contextMenuItem';
import { ContextMenu } from '../components/ui/contextMenu/contextMenu';
import { GroupCard } from '../components/groups/GroupCard';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { SceneCard } from '../components/scenes/SceneCard';
import { useGroups } from '../context/GroupContext';
import { useScenes } from '../context/SceneContext';
import { Backdrop } from '../components/ui/backdrop/Backdrop';

const Groups: NextPage = () => {
	const { groups, deleteGroup } = useGroups();
	const { scenes, deleteScene } = useScenes();
	const [visible, setVisible] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<string>('');

	return (
		<>
			<Backdrop visible={visible} onClick={() => setVisible(false)} />
			<ContextMenu visible={visible}>
				<ContextMenuItem
					title="Edit"
					type="contextItem"
					onClick={() => {
						const group = groups.find((x) => x.id === selectedId);
						if (group != undefined) {
							return router.push(`/editGroup/${selectedId}`);
						}

						const scene = scenes.find((x) => x.id === selectedId);
						if (scene != undefined) {
							return router.push(`/editScene/${selectedId}`);
						}
					}}
				/>
				<ContextMenuItem
					title="Delete"
					type="cancel"
					onClick={() => {
						const group = groups.find((x) => x.id === selectedId);
						if (group != undefined) {
							deleteGroup(group);
							setVisible(false);

							return;
						}

						const scene = scenes.find((x) => x.id === selectedId);
						if (scene != undefined) {
							deleteScene(scene);
							setVisible(false);

							return;
						}
					}}
				/>
				<ContextMenuItem title="Cancel" type="cancel" onClick={() => setVisible(false)} />
			</ContextMenu>
			<LayoutWrapper showAppbar showAppbarIcon appBarTitle="Groups" href="/add/addGroup">
				<div className="grid gap-4">
					<div className="text-white text-center">Groups</div>
					{groups.map((key) => {
						return (
							<GroupCard
								groupID={key.id}
								groupName={key.name}
								title={key.name}
								key={key.name}
								onLongPress={() => {
									setVisible(true);
									setSelectedId(key.id);
								}}
							/>
						);
					})}
					<div className="text-white text-center">Scenes</div>
					<div className="grid grid-cols-2 gap-4">
						{scenes.map((key) => {
							return (
								<SceneCard
									name={key.name}
									sceneID={key.id}
									key={key.id}
									onLongPress={() => {
										setVisible(true);
										setSelectedId(key.id);
									}}
								/>
							);
						})}
					</div>
				</div>
			</LayoutWrapper>
		</>
	);
};

export default Groups;