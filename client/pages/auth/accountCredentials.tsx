import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { Input } from '../../components/ui/input/input';
import { BASE_URL } from '../../config/env';
import { useToast } from '../../context/ToastContext';
import { redirectByPermission } from '../../util/redirect';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	const state = redirectByPermission(session);
	if (state) return state;

	return { props: {} };
};

export const AccountCredentials: NextPage = () => {
	const session = useSession();
	const { addToast } = useToast();
	const router = useRouter();
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');

	const handlePasswordUpdate = async () => {
		if (password !== passwordConfirm) {
			return addToast({ message: 'Passwords do not match', type: 'error' });
		}
		if (passwordConfirm.length < 5) {
			return addToast({ message: 'Password too short', type: 'error' });
		}

		try {
			await axios({
				method: 'patch',
				url: `${BASE_URL}/api/user/${session.data?.user.id}`,
				headers: { Authorization: session.data?.jwt! },
				data: { password: passwordConfirm },
			});

			addToast({ message: 'Password changed', type: 'success' });
			router.push('/auth/accountSettings');
		} catch (error: any) {
			addToast({ message: error.message, type: 'error' });
		}
	};

	return (
		<LayoutWrapper showAppbar showBackButton appBarTitle="Change Password">
			<div className="flex flex-col items-center text-white">
				<div className="flex flex-col gap-4">
					<Input
						title="Password"
						type="password"
						onChange={(e) => setPassword(e.currentTarget.value)}
					/>
					<Input
						title="Password"
						type="password"
						onChange={(e) => setPasswordConfirm(e.currentTarget.value)}
					/>
					<button className="bg-black p-2 rounded-xl" onClick={handlePasswordUpdate}>
						Change Password
					</button>
				</div>
			</div>
		</LayoutWrapper>
	);
};

export default AccountCredentials;
