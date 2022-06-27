import { Tab } from '@headlessui/react';
import type { NextPage } from 'next';
import { GroupLightCard } from '../components/groups/GroupLightCard';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { SceneCard } from '../components/scenes/SceneCard';
import { useGroups } from '../context/GroupContext';
import { useScenes } from '../context/SceneContext';

const Groups: NextPage = () => {
	const groups = useGroups();
	const scenes = useScenes();
	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={true} appBarTitle="Groups" href="/addGroup">
			<div className="grid gap-4">
				<div className="text-zinc-500 text-center">Groups</div>
				{groups.groups.map((key) => {
					return (
						<GroupLightCard groupID={key.id} groupName={key.name} title={key.name} key={key.name} />
					);
				})}
				<div className="text-zinc-500 text-center">Scenes</div>
				<div className="grid grid-cols-2 gap-4">
					{scenes.scenes.map((key) => {
						return <SceneCard name={key.name} sceneID={key.id} id={key.id} />;
					})}
				</div>
			</div>
		</LayoutWrapper>
	);
};

export default Groups;
