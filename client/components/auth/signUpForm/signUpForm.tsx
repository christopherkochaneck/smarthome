import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { QuestionMark } from 'tabler-icons-react';
import { BASE_URL } from '../../../config/env';
import { useToast } from '../../../context/ToastContext';
import { LayoutWrapper } from '../../layout/layoutWrapper';
import { Avatar } from '../../ui/avatar/avatar';
import { Input } from '../../ui/input/input';

export const SignUpForm: FC = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordCofirm] = useState<string>('');

	const { addToast } = useToast();

	const router = useRouter();

	const handleSignUp = async () => {
		if (username.length < 5) {
			return addToast({ message: 'Username too short.', type: 'error' });
		}

		if (password.length < 5) {
			return addToast({ message: 'Password too short.', type: 'error' });
		}

		if (password !== passwordConfirm) {
			return addToast({ message: 'Passwords do not match.', type: 'error' });
		}

		try {
			await axios({
				url: `${BASE_URL}/api/user`,
				method: 'post',
				data: { username: username, password: passwordConfirm },
			});
			addToast({ message: 'Account created', type: 'success' });

			router.replace('/api/auth/signin');
		} catch (error: any) {
			return addToast({ message: error.message, type: 'error' });
		}
	};

	return (
		<div className="w-screen h-screen bg-darkgrey flex flex-col items-center p-4 gap-2">
			<Avatar
				icon={<QuestionMark className="w-14 h-14 text-white" />}
				background="blue"
				dimension={32}
				padding={8}
			/>
			<div className="text-white">Choose a Username and Password</div>
			<span className="flex flex-col items-center gap-4">
				<Input title="Username" onChange={(e) => setUsername(e.currentTarget.value)} />
				<Input
					title="Password"
					type="password"
					onChange={(e) => setPassword(e.currentTarget.value)}
				/>
				<Input
					title="Confirm Password"
					type="password"
					onChange={(e) => setPasswordCofirm(e.currentTarget.value)}
				/>
			</span>
			<button className="bg-black p-2 pl-4 pr-4 text-white rounded-lg" onClick={handleSignUp}>
				Sign Up
			</button>
			<button
				onClick={() => router.push('/api/auth/signin')}
				className="bg-black p-2 pl-4 pr-4 rounded-lg text-white "
			>
				Cancel
			</button>
		</div>
	);
};
