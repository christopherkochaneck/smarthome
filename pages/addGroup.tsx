import type { NextPage } from 'next';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { GroupForm } from '../components/groups/GroupForm';

const AddGroup: NextPage = () => {
	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={false} appBarTitle="Add Group">
			<GroupForm />
		</LayoutWrapper>
	);
};

export default AddGroup;
