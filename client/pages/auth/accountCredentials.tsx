import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { v4 } from 'uuid';
import { LayoutWrapper } from '../../components/layout/layoutWrapper';
import { Input } from '../../components/ui/input/input';
import { BASE_URL } from '../../config/env';
import { useToast } from '../../context/ToastContext';

type Props = {
	session: Session;
};
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
	const session = await getSession(ctx);
	if (!session) {
		return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false,
			},
		};
	}

	return { props: { session } };
};

export const AccountCredentials: NextPage<Props> = ({ session }) => {
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
				url: `${BASE_URL}/api/user/${session.user.id}`,
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
