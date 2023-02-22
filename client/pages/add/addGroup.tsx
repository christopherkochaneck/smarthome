import type { GetServerSideProps, NextPage } from 'next';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { GroupForm } from '../../components/forms/GroupForm';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { redirectByPermission } from '../../util/redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: {} };
};

const AddGroup: NextPage = () => {
	return (
		<LayoutWrapper showAppbar showBackButton appBarTitle="Add Group">
			<GroupForm />
		</LayoutWrapper>
	);
};

export default AddGroup;
