import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { QuestionMark } from 'tabler-icons-react';
import { useToast } from '../../../context/ToastContext';
import { authUser } from '../../../interfaces/authUser';
import { DBUser } from '../../../interfaces/user';
import { addUserToLocalStorage, getUsersFormLocalStorage } from '../../../util/localStorage';
import { addUser } from '../../../util/user';
import { Avatar } from '../../ui/avatar/avatar';
import { Input } from '../../ui/input/input';

export const SignUpForm: FC = () => {
	const router = useRouter();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordCofirm] = useState<string>('');
	const [users, setUsers] = useState<authUser[]>([]);
	const { addToast } = useToast();

	useEffect(() => {
		const localUsers = getUsersFormLocalStorage();
		setUsers(localUsers);
	}, []);

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
			const user: authUser | undefined = await addUser({
				username: username,
				password: passwordConfirm,
			});
			if (!user) return addToast({ message: 'Something went wrong', type: 'error' });

			!users.find((x) => x.id === user.id) && setUsers((prev) => [...prev, user]);

			addUserToLocalStorage(user);
			addToast({ message: 'Account created', type: 'success' });

			await signIn('credentials', {
				redirect: true,
				username: username,
				password: passwordConfirm,
			});
		} catch (error: any) {
			return addToast({ message: 'Something went wrong', type: 'error' });
		}
	};

	return (
		<div className="w-screen h-screen bg-darkgrey flex flex-col items-center p-4 gap-2">
			<Avatar
				icon={<QuestionMark className="w-14 h-14 text-white" />}
				background="black"
				dimension={75}
				padding={20}
			/>
			<div className="text-white">Choose a Username and Password</div>
			<span className="flex flex-col items-center w-full gap-4">
				<Input
					title="Username"
					onChange={(e) => setUsername(e.currentTarget.value)}
					className="rounded-lg"
				/>
				<Input
					title="Password"
					type="password"
					onChange={(e) => setPassword(e.currentTarget.value)}
					className="rounded-lg"
				/>
				<Input
					title="Confirm Password"
					type="password"
					onChange={(e) => setPasswordCofirm(e.currentTarget.value)}
					className="rounded-lg"
				/>
			</span>
			<span className="flex flex-col w-full gap-2">
				<button className="bg-black p-2 pl-4 pr-4 text-white rounded-lg" onClick={handleSignUp}>
					Sign Up
				</button>
				<button
					className="bg-black p-2 pl-4 pr-4 rounded-lg text-white"
					onClick={() => router.push('/api/auth')}
				>
					Cancel
				</button>
			</span>
		</div>
	);
};
