import { NextPage } from 'next';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { SceneSelectionForm } from '../../components/forms/SceneSelectionForm';

const AddScene: NextPage = () => {
	function handleSubmit() {}

	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={false} appBarTitle="Add Scene">
			<SceneSelectionForm />
		</LayoutWrapper>
	);
};

export default AddScene;
