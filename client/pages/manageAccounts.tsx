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
import { Backdrop } from '../components/ui/backdrop/Backdrop';
import { modalOption, SelectionModal } from '../components/ui/modals/selectionModal/SelectionModal';

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
	const [userToDelete, setUserToDelete] = useState<DBUser>();
	const [userToDeny, setUserToDeny] = useState<DBUser>();
	const [userToAccept, setUserToAccept] = useState<DBUser>();
	const [dialogVisible, setDialogVisible] = useState<boolean>(false);
	const [dialogMessage, setDialogMessage] = useState<string>('');
	const dialogOptions: modalOption[] = ['cancel', 'confirm'];

	useEffect(() => {
		const fetchUsers = async () => {
			const authorization = session.data?.jwt;
			if (!authorization) return;

			const receivedUsers = await getUsers(authorization);
			setUsers(receivedUsers);
		};
		fetchUsers();
	}, []);

	const mapUsers = () => {
		return users.map((user: any) => {
			return (
				<UserSelectable
					key={user._id}
					_id={user._id}
					avatarBackground="black"
					userName={user.username}
					actions={[
						<div key="" className="bg-darkgrey rounded-full p-2">
							<Trash
								key="Trash"
								onClick={async (e) => {
									e.stopPropagation();
									setDialogMessage('Are you sure that you want to delete  this account?');
									setUserToDelete(user);
									setDialogVisible(true);
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
										e.stopPropagation();
										setDialogMessage('Are you sure that you want to deny this account?');
										setUserToDeny(user);
										setDialogVisible(true);
									}}
								/>
							</div>,
							<div key="2" className="bg-darkgrey rounded-full p-2">
								<Check
									key="confirm"
									onClick={(e) => {
										e.preventDefault();
										setDialogMessage('Are you sure that you want to accept this account?');
										setUserToAccept(user);
										setDialogVisible(true);
									}}
								/>
							</div>,
						]}
					/>
				);
			});
	};

	const deleteUser = async (user: DBUser) => {
		try {
			await axios({
				method: 'delete',
				url: `${BASE_URL}/api/user/${user._id}`,
				headers: { Authorization: session.data?.jwt! },
			});
			setUsers((prev) => prev.filter((x) => x._id !== user._id));
			addToast({ message: 'User deleted successfully', type: 'success' });
		} catch (error: any) {
			return error.message;
		}
	};

	const handleConfirm = () => async () => {
		let errorMessage;
		if (userToDelete !== undefined) {
			errorMessage = await deleteUser(userToDelete!);
			setUsers((prev) => prev.filter((x) => x._id !== userToDelete._id));
		}

		if (userToDeny !== undefined) {
			errorMessage = await changeUserPermission(session.data?.jwt!, {
				userId: userToDeny._id,
				permission: 'denied',
			});
		}

		if (userToAccept !== undefined) {
			errorMessage = await changeUserPermission(session.data?.jwt!, {
				userId: userToAccept._id,
				permission: 'user',
			});
		}

		if (!errorMessage) {
			setUserToDelete(undefined);
			setUserToDeny(undefined);
			setUserToAccept(undefined);
			setDialogVisible(false);
			return;
		}

		addToast({ message: errorMessage, type: 'error' });
	};

	return (
		<>
			{dialogVisible && (
				<Backdrop className="flex items-center justify-center">
					<SelectionModal
						options={dialogOptions}
						message={dialogMessage}
						onConfirm={handleConfirm()}
						onCancel={() => {
							setUserToDelete(undefined);
							setUserToDeny(undefined);
							setDialogVisible(false);
						}}
					/>
				</Backdrop>
			)}
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
		</>
	);
};

export default ManageAccounts;
