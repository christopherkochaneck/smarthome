import { Dispatch, FC, SetStateAction } from 'react';
import { Divider } from '../../ui/list/components/divider/Divider';
import { Avatar } from '../../ui/avatar/avatar';
import { UserSelectable } from './components/userSelectable';
import router from 'next/router';

interface Props {
	setSelectedUser: Dispatch<SetStateAction<string>>;
}

export const UserSelectionForm: FC<Props> = ({ setSelectedUser }) => {
	return (
		<>
			<div className="flex flex-col items-center w-full gap-8">
				<span className="flex flex-col gap-3 items-center">
					<Avatar iconSrc="/icon-512x512.png" dimension={75} padding={20} background="white" />
					<span className="text-white">Smarthome</span>
				</span>
				<span className="text-white">Please choose an Account to log into.</span>
				<div className="flex flex-col gap-4 w-full">
					<UserSelectable
						avatarBackground="rgba(88, 28, 135)"
						userName="Christopher"
						setSelectedUser={setSelectedUser}
					/>
					<Divider />
					<UserSelectable
						avatarBackground="rgba(88, 28, 135)"
						userName="User 2"
						setSelectedUser={setSelectedUser}
					/>
				</div>
				<button
					className="bg-black rounded-full w-max h-max pl-4 pr-4 pt-2 pb-2 text-white"
					onClick={() => {
						console.log('signUp');
					}}
				>
					Create new Account
				</button>
			</div>
		</>
	);
};

export default UserSelectionForm;
