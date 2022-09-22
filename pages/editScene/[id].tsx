import { NextPage } from 'next';
import { EditSceneForm } from '../../components/forms/EditSceneForm';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';

const EditScene: NextPage = () => {
	return (
		<LayoutWrapper showAppbar appBarTitle="Edit Scene">
			<EditSceneForm />
		</LayoutWrapper>
	);
};

export default EditScene;
