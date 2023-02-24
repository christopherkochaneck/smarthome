import { signIn, useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import { useToast } from '../../../context/ToastContext';
import { useRouter } from 'next/router';
import { Avatar } from '../../ui/avatar/avatar';
import { Input } from '../../ui/input/input';
import { User as UserIcon } from 'tabler-icons-react';
import { Session } from 'next-auth';
import { authUser } from '../../../interfaces/authUser';

type Props = {
	userToLogin: authUser | null;
	goBack: () => void;
};

export const SignInForm: FC<Props> = ({ userToLogin, goBack }) => {
	const originSession = useSession();
	const [session, setSession] = useState<Session | null>(null);
	const { addToast } = useToast();

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [users, setUsers] = useState<authUser[]>([]);
	const router = useRouter();

	useEffect(() => {
		const localUsers = localStorage.users;

		if (localUsers) {
			setUsers(JSON.parse(localUsers));
		} else {
			localStorage.setItem('users', JSON.stringify([]));
		}
	}, []);

	useEffect(() => {
		const manageLocalStorage = async () => {
			setSession(originSession.data);

			const sessionUser: authUser = originSession.data?.user;
			if (!sessionUser) return;

			if (users.length === 0) {
				localStorage.setItem('users', JSON.stringify([sessionUser]));
			} else {
				!users.find((x) => x.id === sessionUser.id) &&
					localStorage.setItem('users', JSON.stringify(users.push(sessionUser)));
			}
		};
		manageLocalStorage();
	}, [originSession]);

	const handleSignIn = async () => {
		const res = await signIn('credentials', {
			redirect: false,
			username: userToLogin ? userToLogin.name : username,
			password: password,
		});

		if (res === undefined) return;

		if (res.status !== 200) {
			return addToast({
				message: res.error || 'Something went wrong',
				type: 'error',
			});
		}

		addToast({
			message: 'Login successfull',
			type: 'success',
		});

		router.push('/');
	};

	return (
		<>
			<div className="bg-darkgrey w-screen h-screen flex flex-col items-center gap-4 p-4">
				<span className="flex flex-col items-center gap-2">
					<Avatar
						padding={20}
						dimension={75}
						background="black"
						icon={<UserIcon className="h-14 w-14 text-white" />}
					/>
					{userToLogin && <span className="text-white">{userToLogin.name}</span>}
				</span>
				<span className="flex flex-col w-full gap-2">
					{!userToLogin && (
						<Input title="Username" onChange={(e) => setUsername(e.currentTarget.value)} />
					)}
					<Input
						title="Password"
						type="password"
						onChange={(e) => setPassword(e.currentTarget.value)}
					/>
					<button
						className="bg-black rounded-xl w-full text-white pl-4 pr-4 pt-2 pb-2"
						onClick={handleSignIn}
					>
						Log in
					</button>
					{users.length > 0 && (
						<button
							className="bg-black rounded-xl w-full text-white pl-4 pr-4 pt-2 pb-2"
							onClick={() => goBack()}
						>
							Choose another account
						</button>
					)}
					{users.length === 0 && (
						<button
							className="bg-black rounded-xl w-full text-white pl-4 pr-4 pt-2 pb-2"
							onClick={() => router.push('/auth/signUp')}
						>
							Sign Up
						</button>
					)}
				</span>
			</div>
		</>
	);
};
