import { GetServerSideProps, NextPage } from 'next';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { SceneForm } from '../../components/forms/SceneForm';
import { getSession } from 'next-auth/react';
import { redirectByPermission } from '../../util/redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: {} };
};

const AddScene: NextPage = () => {
	return (
		<LayoutWrapper showAppbar showBackButton appBarTitle="Add Scene">
			<SceneForm />
		</LayoutWrapper>
	);
};

export default AddScene;
