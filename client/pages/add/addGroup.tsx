import type { GetServerSideProps, NextPage } from 'next';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { GroupForm } from '../../components/forms/GroupForm';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';

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

const AddGroup: NextPage<Props> = ({ session }) => {
	return (
		<LayoutWrapper showAppbar showBackButton appBarTitle="Add Group">
			<GroupForm />
		</LayoutWrapper>
	);
};

export default AddGroup;
