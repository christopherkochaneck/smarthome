import { NextPage } from 'next';
import { EditSceneForm } from '../../components/forms/EditSceneForm';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';

const EditScene: NextPage = () => {
	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={false} appBarTitle="Edit Scene">
			<EditSceneForm />
		</LayoutWrapper>
	);
};

export default EditScene;
