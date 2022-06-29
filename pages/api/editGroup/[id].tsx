import { NextPage } from 'next';
import { EditGroupForm } from '../../../components/forms/EditGroupForm';
import { LayoutWrapper } from '../../../components/layout/layoutWrapper';

const EditGroup: NextPage = () => {
	return (
		<>
			<LayoutWrapper showAppbar={true} showAppbarIcon={false} appBarTitle="Devices">
				<EditGroupForm />
			</LayoutWrapper>
		</>
	);
};

export default EditGroup;
