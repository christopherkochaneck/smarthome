import { Dispatch, FC, SetStateAction } from 'react';
import { Avatar } from '../../ui/avatar/avatar';
import { UserSelectable } from './components/userSelectable';
import { User } from '../../../interfaces/user';

type Props = {
	setUserToLogin: Dispatch<SetStateAction<User | null>>;
	users: User[];
};

export const UserSelectionForm: FC<Props> = ({ users, setUserToLogin }) => {
	return (
		<>
			<div className="w-screen h-screen bg-darkgrey flex flex-col items-center p-8">
				<span className="flex flex-col gap-3 items-center">
					<Avatar iconSrc="/icon-512x512.png" dimension={75} padding={20} background="white" />
					<span className="text-white">Smarthome</span>
				</span>
				<span className="text-white">Please choose an Account to log into.</span>
				<div className="flex flex-col gap-4 w-full">
					{users.map((user: User) => {
						return (
							<UserSelectable
								_id={user._id}
								key={user._id}
								avatarBackground="purple"
								userName={user.username}
								onClick={() => setUserToLogin(user)}
							/>
						);
					})}
				</div>
				<button className="bg-black rounded-full w-max h-max pl-4 pr-4 pt-2 pb-2 text-white">
					Create new Account
				</button>
			</div>
		</>
	);
};

export default UserSelectionForm;
