import type { NextPage } from 'next';
import { GroupLightCard } from '../components/groups/GroupLightCard';
import { LayoutWrapper } from '../components/layout/layoutWrapper';

const Groups: NextPage = () => {
	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={true} appBarTitle="Groups">
			<div className="grid gap-4">
				<div className="text-zinc-500 text-center">Groups</div>
				<GroupLightCard group="test" title="LED Stripes" />
				<div className="text-zinc-500 text-center">Scenes</div>
			</div>
		</LayoutWrapper>
	);
};

export default Groups;
