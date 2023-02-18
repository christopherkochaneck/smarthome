import { signIn } from 'next-auth/react';
import { FC, useState } from 'react';
import { useToast } from '../../../context/ToastContext';
import { Avatar } from '../../ui/avatar/avatar';
import { Input } from '../../ui/input/input';
import { User as UserIcon } from 'tabler-icons-react';
import { User } from '../../../interfaces/user';

type Props = {
	userToLogin: User;
	goBack: () => void;
};

export const LoginForm: FC<Props> = ({ userToLogin, goBack }) => {
	const { addToast } = useToast();
	const [password, setPassword] = useState<string>('');

	const handleSignIn = async () => {
		const res = await signIn('credentials', {
			username: userToLogin.username,
			password: password,
		});
	};

	return (
		<>
			<div className="bg-darkgrey w-screen h-screen flex flex-col items-center gap-4">
				<span className="flex flex-col items-center gap-2">
					<Avatar
						padding={12}
						dimension={32}
						background="purple"
						icon={<UserIcon className="h-14 w-14 text-white" />}
					/>
					<span className="text-white">{userToLogin.username}</span>
				</span>
				<Input
					title="Password"
					type="password"
					onChange={(e) => setPassword(e.currentTarget.value)}
				/>
				<button
					className="bg-black rounded-xl text-white pl-4 pr-4 pt-2 pb-2"
					onClick={handleSignIn}
				>
					Login
				</button>
				<button
					className="bg-black rounded-xl text-white pl-4 pr-4 pt-2 pb-2"
					onClick={() => goBack()}
				>
					Choose another account
				</button>
			</div>
		</>
	);
};
