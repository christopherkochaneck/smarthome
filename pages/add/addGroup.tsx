import type { NextPage } from 'next';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { GroupForm } from '../../components/forms/GroupForm';

const AddGroup: NextPage = () => {
	return (
		<LayoutWrapper showAppbar showBackButton appBarTitle="Add Group">
			<GroupForm />
		</LayoutWrapper>
	);
};

export default AddGroup;
