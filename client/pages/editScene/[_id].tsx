import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { EditSceneForm } from '../../components/forms/EditSceneForm';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { redirectByPermission } from '../../util/redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: { session } };
};

const EditScene: NextPage = () => {
	return (
		<LayoutWrapper showAppbar showBackButton appBarTitle="Edit Scene">
			<EditSceneForm />
		</LayoutWrapper>
	);
};

export default EditScene;
