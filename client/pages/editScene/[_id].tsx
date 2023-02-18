import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { EditSceneForm } from '../../components/forms/EditSceneForm';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';

interface Props {
	session: Session;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);
	if (!session) {
		return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false,
			},
		};
	}

	return { props: { session } };
};

const EditScene: NextPage<Props> = ({ session }) => {
	return (
		<LayoutWrapper showAppbar showBackButton appBarTitle="Edit Scene">
			<EditSceneForm />
		</LayoutWrapper>
	);
};

export default EditScene;
