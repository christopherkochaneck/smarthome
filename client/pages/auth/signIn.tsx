import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { LoginForm } from '../../components/auth/loginForm/loginForm';
import UserSelectionForm from '../../components/auth/userSelectionForm/userSelectionForm';
import { DBUser } from '../../interfaces/user';
import { getUsers } from '../../util/user';

type Props = {
	users: DBUser[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const users = await getUsers();
	return { props: { users } };
};

export const SignIn: NextPage<Props> = ({ users }) => {
	const [userToLogin, setUserToLogin] = useState<DBUser | null>(null);
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
