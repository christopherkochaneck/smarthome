import type { NextPage } from 'next';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { signIn, signOut, useSession } from 'next-auth/react';

const Settings: NextPage = () => {
	const { data: session, status } = useSession();

	return (
		<LayoutWrapper>
			{session ? (
				<button onClick={() => signOut()} className="text-white">
					Logout
				</button>
			) : null}
		</LayoutWrapper>
	);
};

export default Settings;
