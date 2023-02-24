import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { SignInForm } from '../../components/auth/signInForm/signInForm';
import UserSelectionForm from '../../components/auth/userSelectionForm/userSelectionForm';
import { authUser } from '../../interfaces/authUser';

export const SignIn: NextPage = () => {
	const [userToLogin, setUserToLogin] = useState<authUser | null>(null);
	const [users, setUsers] = useState<authUser[]>([]);
	const [newLogin, setNewLogin] = useState<boolean>(false);

	useEffect(() => {
		const localUsers = localStorage.users;

		if (!localUsers) localStorage.setItem('users', JSON.stringify([]));
		setUsers(JSON.parse(localUsers));
	}, []);

	return (
		<>
			{!users.length || userToLogin || newLogin ? (
				<SignInForm
					userToLogin={userToLogin}
					goBack={() => {
						setUserToLogin(null);
						setNewLogin(false);
					}}
				/>
			) : (
				<UserSelectionForm setUserToLogin={setUserToLogin} setNewLogin={setNewLogin} />
			)}
		</>
	);
};

export default SignIn;
