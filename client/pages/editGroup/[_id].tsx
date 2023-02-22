import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { EditGroupForm } from '../../components/forms/EditGroupForm';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { redirectByPermission } from '../../util/redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: { session } };
};

const EditGroup: NextPage = () => {
	return (
		<LayoutWrapper showAppbar showBackButton appBarTitle="Edit Group">
			<EditGroupForm />
		</LayoutWrapper>
	);
};

export default EditGroup;
