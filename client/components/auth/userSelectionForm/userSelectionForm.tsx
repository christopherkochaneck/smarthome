import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Avatar } from '../../ui/avatar/avatar';
import { UserSelectable } from './components/userSelectable';
import { ArrowNarrowRight } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import { authUser } from '../../../interfaces/authUser';
import { clearUserLocalStorage, getUsersFormLocalStorage } from '../../../util/localStorage';

type Props = {
	setUserToLogin: Dispatch<SetStateAction<authUser | null>>;
	setNewLogin: Dispatch<SetStateAction<boolean>>;
};

export const UserSelectionForm: FC<Props> = ({ setUserToLogin, setNewLogin }) => {
	const router = useRouter();
	const [users, setUsers] = useState<authUser[]>([]);

	useEffect(() => {
		const localUsers = getUsersFormLocalStorage();
		if (localUsers) setUsers(localUsers);
	}, []);

	return (
		<>
			<div className="w-screen h-screen bg-darkgrey flex flex-col items-center p-8 gap-8">
				<span className="flex flex-col gap-2 items-center">
					<Avatar icon="/icon-512x512.png" dimension={75} padding={20} background="white" />
					<span className="text-white">Smarthome</span>
				</span>
				<span className="text-white">Please choose an Account to log into.</span>
				<div className="flex flex-col gap-4 w-full">
					{users.map((user: authUser) => {
						return (
							<UserSelectable
								_id={user.id}
								key={user.id}
								avatarBackground="black"
								userName={user.name}
								onClick={() => setUserToLogin(user)}
								actions={[<ArrowNarrowRight key="arrow" className="w-8 h-8 text-white" />]}
							/>
						);
					})}
				</div>
				<span className="flex flex-col w-full gap-2">
					<button
						className="bg-black rounded-lg w-full h-max pl-4 pr-4 pt-2 pb-2 text-white"
						onClick={() => setNewLogin(true)}
					>
						Login with different account
					</button>
					<button
						className="bg-black rounded-lg w-full h-max pl-4 pr-4 pt-2 pb-2 text-white"
						onClick={() => router.push('/auth/signUp')}
					>
						Create new Account
					</button>
					<button
						className="bg-black rounded-lg w-full h-max pl-4 pr-4 pt-2 pb-2 mt-4 text-white"
						onClick={() => {
							clearUserLocalStorage();
							setUsers([]);
							setUserToLogin(null);
							setNewLogin(true);
						}}
					>
						Clear Account entries
					</button>
				</span>
			</div>
		</>
	);
};

export default UserSelectionForm;
