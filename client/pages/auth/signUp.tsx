import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { SignUpForm } from '../../components/auth/signUpForm/signUpForm';
import { redirectByPermission } from '../../util/redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: {} };
};

export const SignUp: NextPage = () => {
	return <SignUpForm />;
};

export default SignUp;
