import type { NextPage } from 'next';
import { GroupCard } from '../components/groups/GroupCard';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { useDevices } from '../context/DeviceContext';

const Groups: NextPage = () => {
	const devices = useDevices();
	return (
		<LayoutWrapper>
			<div>
				<GroupCard></GroupCard>
			</div>
		</LayoutWrapper>
	);
};

export default Groups;
