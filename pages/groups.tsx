import type { NextPage } from 'next';
import { GroupLightCard } from '../components/groups/GroupLightCard';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { useGroups } from '../context/GroupContext';

const Groups: NextPage = () => {
	const groups = useGroups();
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
			</div>
		</LayoutWrapper>
	);
};

export default Groups;
