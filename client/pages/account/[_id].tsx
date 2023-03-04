import moment from 'moment';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Checkbox, Square, User } from 'tabler-icons-react';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { Avatar } from '../../components/ui/avatar/avatar';
import { Card } from '../../components/ui/card/card';
import { useToast } from '../../context/ToastContext';
import { redirectByPermission } from '../../util/redirect';
import { deleteUser, getUserById } from '../../util/user';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;
	return { props: {} };
};

export const AccountDetailPage: NextPage = () => {
	const { addToast } = useToast();
	const session = useSession();
	const router = useRouter();

	const [user, setUser] = useState<any>();
	const userId = router.query._id?.toString();

	useEffect(() => {
		const fetchUser = async () => {
			if (!session.data || !userId) return;
			const res = await getUserById(session.data?.jwt, userId);
			setUser(res);
		};
		fetchUser();
	}, []);

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
					<div>{user?.name}</div>
				</Card>
				<Card className="p-2">
					<div>Date of creation</div>
					<div>{moment(user?.dayOfCreation).utc().format('DD.MM.YYYY')}</div>
				</Card>
				<Card className="flex flex-col p-2 gap-2">
					<div>Permissions</div>
					<span className="flex">
						{user?.permission === 'admin' ? <Checkbox /> : <Square />}
						<span className="grow">Admin</span>
					</span>
					<span className="flex">
						{user?.permission === 'user' ? <Checkbox /> : <Square />}
						<span className="grow">User</span>
					</span>
					<span className="flex">
						{user?.permission === 'unauthorized' ? <Checkbox /> : <Square />}
						<span className="grow">Unauthorized</span>
					</span>
					<span className="flex">
						{user?.permission === 'denied' ? <Checkbox /> : <Square />}
						<span className="grow">Denied</span>
					</span>
				</Card>
			</div>
			<span className="flex flex-col w-full gap-2">
				<button className="p-2 bg-black rounded-xl text-white w-full">Change Permissions</button>
				<button
					className="p-2 bg-red-700 rounded-xl text-white w-full"
					onClick={async () => {
						if (!userId || !session.data)
							return addToast({ message: 'Something went wrong', type: 'error' });
						const res = await deleteUser(userId, session.data?.jwt);
						if (res?.status === 200) {
							router.push('/manageAccounts');
							return addToast({ message: 'User deleted successfully', type: 'success' });
						}
						addToast({ message: 'Something went wrong', type: 'error' });
					}}
				>
					Delete Account
				</button>
			</span>
		</LayoutWrapper>
	);
};

export default AccountDetailPage;
