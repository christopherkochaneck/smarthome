import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';
import router from 'next/router';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { Divider } from '../components/ui/list/components/divider/Divider';
import { ListTile } from '../components/ui/list/components/listTile/ListTile';

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

const Settings: NextPage<Props> = ({ session }) => {
	return (
		<LayoutWrapper showAppbar appBarTitle="Settings">
			<div className="flex flex-col">
				<ListTile title="Open Admin Panel" onClick={() => router.push('/admin/adminPanel')} />
				<Divider />
				<ListTile title="Show Power Log" onClick={() => router.push('/powerLog')} />
				<Divider />
				<ListTile title="Your Account" onClick={() => router.push('/auth/accountSettings')} />
				{session.user.permission === 'admin' && (
					<>
						<Divider />
						<ListTile title="Manage Accounts" onClick={() => router.push('/manageAccounts')} />
					</>
				)}
			</div>
		</LayoutWrapper>
	);
};

export default Settings;
