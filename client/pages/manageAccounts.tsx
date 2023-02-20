import axios from 'axios';
import { Session } from 'next-auth';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Check, Trash, X } from 'tabler-icons-react';
import UserSelectable from '../components/auth/userSelectionForm/components/userSelectable';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { BASE_URL } from '../config/env';
import { useToast } from '../context/ToastContext';
import { DBUser } from '../interfaces/user';
import { getUsers } from '../util/user';

interface Props {
	session: Session;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);
	console.log(session);
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

export const ManageAccounts: NextPage<Props> = ({ session }) => {
	const router = useRouter();
	const { addToast } = useToast();
	const [users, setUsers] = useState<DBUser[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers();
			setUsers(users.filter((x: DBUser) => x._id !== session.user.id));
		};
		fetchUsers();
	}, []);

	const mapUsers = () => {
		return users.map((user: any) => {
			return (
				<UserSelectable
					key={user._id}
					_id={user._id}
					avatarBackground="purple"
					userName={user.username}
					actions={[
						<div key="" className="bg-darkgrey rounded-full p-2">
							<Trash
								key="Trash"
								onClick={async (e) => {
									e.stopPropagation();
									try {
										await axios({ method: 'delete', url: `${BASE_URL}/api/user/${user._id}` });
										setUsers((prev) => prev.filter((x) => x._id !== user._id));
										addToast({ message: 'User deleted successfully', type: 'success' });
									} catch (error: any) {
										addToast({ message: error.message, type: 'success' });
									}
								}}
							/>
						</div>,
					]}
					onClick={() => router.push(`/account/${user._id}`)}
				/>
			);
		});
	};

	return (
		<LayoutWrapper
			appBarTitle="Manage Accounts"
			showAppbar
			showBackButton
			className="flex flex-col items-center text-white"
		>
			<div className="text-white">Users that are waiting for an approval</div>
			<div className="w-full">
				<UserSelectable
					_id="123"
					avatarBackground="purple"
					onClick={() => null}
					userName="Username"
					actions={[
						<div key="1" className="bg-darkgrey rounded-full p-2">
							<X
								key="x"
								onClick={(e) => {
									e.preventDefault();
									console.log('deny user');
								}}
							/>
						</div>,
						<div key="2" className="bg-darkgrey rounded-full p-2">
							<Check
								key="confirm"
								onClick={(e) => {
									e.preventDefault();
									console.log('accept user');
								}}
							/>
						</div>,
					]}
				/>
			</div>
			<div>Users</div>
			<div className="w-full flex flex-col gap-4">{mapUsers()}</div>
		</LayoutWrapper>
	);
};

export default ManageAccounts;
