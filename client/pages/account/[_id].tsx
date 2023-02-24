import { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { Checkbox, Square, User } from 'tabler-icons-react';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { Avatar } from '../../components/ui/avatar/avatar';
import { Card } from '../../components/ui/card/card';
import { redirectByPermission } from '../../util/redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: {} };
};

export const AccountDetailPage: NextPage = () => {
	const session = useSession();
	return (
		<LayoutWrapper
			className="flex flex-col items-center gap-4"
			appBarTitle="Account Detail"
			showBackButton
			showAppbar
		>
			<Avatar
				dimension={75}
				padding={20}
				background="black"
				icon={<User className="text-white w-14 h-14" />}
			/>
			<div className="grid grid-cols-2 gap-4 text-white">
				<Card className="p-2">
					<div>Username</div>
					<div>Chris</div>
				</Card>
				<Card className="p-2">
					<div>Date of creation</div>
				</Card>
				<Card className="flex flex-col p-2 gap-2">
					<div>Permissions</div>
					<span className="flex">
						{session.data?.user.permission === 'admin' ? <Checkbox /> : <Square />}
						<span className="flex-grow">Admin</span>
					</span>
					<span className="flex">
						{session.data?.user.permission === 'user' ? <Checkbox /> : <Square />}
						<span className="flex-grow">User</span>
					</span>
					<span className="flex">
						{session.data?.user.permission === 'unauthorized' ? <Checkbox /> : <Square />}
						<span className="flex-grow">Unauthorized</span>
					</span>
					<span className="flex">
						{session.data?.user.permission === 'denied' ? <Checkbox /> : <Square />}
						<span className="flex-grow">Denied</span>
					</span>
				</Card>
			</div>
			<button className="p-2 bg-black rounded-xl text-white">Change Permissions</button>
			<button className="p-2 bg-red-700 rounded-xl text-white">Delete Account</button>
		</LayoutWrapper>
	);
};

export default AccountDetailPage;
