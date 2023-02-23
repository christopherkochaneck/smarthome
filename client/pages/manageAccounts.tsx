import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Check, Trash, X } from 'tabler-icons-react';
import UserSelectable from '../components/auth/userSelectionForm/components/userSelectable';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { BASE_URL } from '../config/env';
import { useToast } from '../context/ToastContext';
import { DBUser } from '../interfaces/user';
import { changeUserPermission, getUsers } from '../util/user';
import { redirectByPermission } from '../util/redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: {} };
};

export const ManageAccounts: NextPage = () => {
	const session = useSession();
	const router = useRouter();
	const { addToast } = useToast();
	const [users, setUsers] = useState<DBUser[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers();
			setUsers(users.filter((x: DBUser) => x._id !== session.data?.user._id));
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
										await axios({
											method: 'delete',
											url: `${BASE_URL}/api/user/${user._id}`,
											headers: { Authorization: session.data?.jwt! },
										});
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

	const mapUnauthorizedUsers = () => {
		return users
			.filter((x) => x.permission === 'unauthorized')
			.map((user) => {
				return (
					<UserSelectable
						_id={user._id}
						key={user._id}
						avatarBackground="purple"
						onClick={() => null}
						userName={user.username}
						actions={[
							<div key="1" className="bg-darkgrey rounded-full p-2">
								<X
									key="x"
									onClick={(e) => {
										e.preventDefault();
										changeUserPermission(session.data?.jwt!, {
											userId: user._id,
											permission: 'denied',
										});
										addToast({ message: 'Permission changed', type: 'success' });
										setUsers((prev) => prev.filter((x) => x._id !== user._id));
									}}
								/>
							</div>,
							<div key="2" className="bg-darkgrey rounded-full p-2">
								<Check
									key="confirm"
									onClick={(e) => {
										e.preventDefault();
										changeUserPermission(session.data?.jwt!, {
											userId: user._id,
											permission: 'user',
										});
										addToast({ message: 'Permission changed', type: 'success' });
										setUsers((prev) => prev.filter((x) => x._id !== user._id));
									}}
								/>
							</div>,
						]}
					/>
				);
			});
	};

	return (
		<LayoutWrapper
			appBarTitle="Manage Accounts"
			showAppbar
			showBackButton
			className="flex flex-col items-center text-white gap-5"
		>
			<span className="flex flex-col items-center gap-5 w-full">
				<div className="text-2xl">Users that are waiting for an approval</div>
				<div className="w-full flex flex-col gap-4">{mapUnauthorizedUsers()}</div>
			</span>
			<span className="flex flex-col items-center gap-5 w-full">
				<div className="text-2xl">Users</div>
				<div className="w-full flex flex-col gap-4">{mapUsers()}</div>
			</span>
		</LayoutWrapper>
	);
};

export default ManageAccounts;
