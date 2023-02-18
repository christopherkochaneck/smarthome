import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { QuestionMark } from 'tabler-icons-react';
import { v4 } from 'uuid';
import { useToast } from '../../../context/ToastContext';
import { Avatar } from '../../ui/avatar/avatar';
import { Input } from '../../ui/input/input';

export const SignUpForm: FC = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const { addToast } = useToast();

	const router = useRouter();

	return (
		<div className="bg-darkgrey w-screen h-screen flex flex-col items-center p-4 gap-2 ">
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
			</span>
			<button
				className="bg-black p-2 pl-4 pr-4 text-white rounded-lg"
				onClick={() => {
					if (username.length < 5 || password.length < 5) {
						addToast({ id: v4(), message: 'Username or Password too short.', type: 'error' });
						return;
					}
					router.push('/auth/login');
				}}
			>
				Sign Up
			</button>
		</div>
	);
};
