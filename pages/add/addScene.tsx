import { NextPage } from 'next';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { SceneForm } from '../../components/forms/SceneForm';

const AddScene: NextPage = () => {
	function handleSubmit() {}

	return (
		<LayoutWrapper showAppbar appBarTitle="Add Scene">
			<SceneForm />
		</LayoutWrapper>
	);
};

export default AddScene;
