import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { LoginForm } from '../../components/auth/loginForm/loginForm';
import UserSelectionForm from '../../components/auth/userSelectionForm/userSelectionForm';
import { DBUser } from '../../interfaces/user';
import { redirectSignInPage } from '../../util/redirect';
import { getUsers } from '../../util/user';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectSignInPage(session);
	if (state) return state;

	return { props: {} };
};

export const SignIn: NextPage = () => {
	const [userToLogin, setUserToLogin] = useState<DBUser | null>(null);
	const [users, setUsers] = useState<DBUser[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const users = await getUsers();
			setUsers(users);
		};
		fetchData();
	}, []);

	return (
		<>
			{userToLogin ? (
				<LoginForm userToLogin={userToLogin} goBack={() => setUserToLogin(null)} />
			) : (
				<UserSelectionForm users={users} setUserToLogin={setUserToLogin} />
			)}
		</>
	);
};

export default SignIn;
