import { GetServerSideProps, NextPage } from 'next';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { SceneForm } from '../../components/forms/SceneForm';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

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

const AddScene: NextPage<Props> = ({ session }) => {
	return (
		<LayoutWrapper showAppbar showBackButton appBarTitle="Add Scene">
			<SceneForm />
		</LayoutWrapper>
	);
};

export default AddScene;
