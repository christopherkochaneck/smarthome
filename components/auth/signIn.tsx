import GoogleButton from 'react-google-button';
import { signIn, signOut } from 'next-auth/react';
import { FC } from 'react';

export const SignIn: FC = () => {
	return (
		<div className="flex flex-row jusify-center items-center bg-zinc-800 h-screen w-screen">
			<GoogleButton onClick={() => signIn('google')} />
		</div>
	);
};
