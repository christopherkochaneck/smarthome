import { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import router from 'next/router';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { Divider } from '../components/ui/list/components/divider/Divider';
import { ListTile } from '../components/ui/list/components/listTile/ListTile';
import { redirectByPermission } from '../util/redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: {} };
};

const Settings: NextPage = () => {
	const session = useSession();
	return (
		<LayoutWrapper showAppbar appBarTitle="Settings">
			<div className="flex flex-col">
				<ListTile title="Show Power Log" onClick={() => router.push('/powerLog')} />
				<Divider />
				<ListTile title="Your Account" onClick={() => router.push('/auth/accountSettings')} />
				{session.data?.user.permission === 'admin' && (
					<>
						<Divider />
						<ListTile title="Manage Accounts" onClick={() => router.push('/manageAccounts')} />
						<Divider />
						<ListTile title="Open Admin Panel" onClick={() => router.push('/admin/adminPanel')} />
					</>
				)}
			</div>
		</LayoutWrapper>
	);
};

export default Settings;
