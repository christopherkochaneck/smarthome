import { FC, useState } from 'react';
import { LoginForm } from './loginForm/loginForm';
import UserSelectionForm from './userSelectionForm/userSelectionForm';

export const Login: FC = () => {
	const [selectedUser, setSelectedUser] = useState<string>('');
	return (
		<div className="w-screen h-screen bg-darkgrey flex flex-col items-center p-8">
			{selectedUser ? <LoginForm /> : <UserSelectionForm setSelectedUser={setSelectedUser} />}
		</div>
	);
};

export default Login;
