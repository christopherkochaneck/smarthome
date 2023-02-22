import { Dispatch, FC, SetStateAction } from 'react';
import { Avatar } from '../../ui/avatar/avatar';
import { UserSelectable } from './components/userSelectable';
import { DBUser } from '../../../interfaces/user';
import { ArrowNarrowRight } from 'tabler-icons-react';
import { useRouter } from 'next/router';

type Props = {
	setUserToLogin: Dispatch<SetStateAction<DBUser | null>>;
	users: DBUser[];
};

export const UserSelectionForm: FC<Props> = ({ users, setUserToLogin }) => {
	const router = useRouter();
	return (
		<>
			<div className="w-screen h-screen bg-darkgrey flex flex-col items-center p-8 gap-8">
				<span className="flex flex-col gap-2 items-center">
					<Avatar iconSrc="/icon-512x512.png" dimension={75} padding={20} background="white" />
					<span className="text-white">Smarthome</span>
				</span>
				<span className="text-white">Please choose an Account to log into.</span>
				<div className="flex flex-col gap-4 w-full">
					{users.map((user: DBUser) => {
						return (
							<UserSelectable
								_id={user._id}
								key={user._id}
								avatarBackground="purple"
								userName={user.username}
								onClick={() => setUserToLogin(user)}
								actions={[<ArrowNarrowRight key="arrow" className="w-8 h-8 text-white" />]}
							/>
						);
					})}
				</div>
				<button
					className="bg-black rounded-full w-max h-max pl-4 pr-4 pt-2 pb-2 text-white"
					onClick={() => router.push('/auth/signUp')}
				>
					Create new Account
				</button>
			</div>
		</>
	);
};

export default UserSelectionForm;
