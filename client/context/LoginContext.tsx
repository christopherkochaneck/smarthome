import { createContext, FC, useContext, useMemo, useState } from 'react';
import Login from '../components/auth/login';

export interface User {
	_id: string;
	name: string;
	isAdmin: boolean;
}

interface UserContextType {
	addUser: (user: User) => void;
}

interface Props {
	children?: React.ReactNode;
}

const LoginContext = createContext<UserContextType>(undefined!);

export function useToast() {
	return useContext(LoginContext);
}

export const LoginProvider: FC<Props> = (props) => {
	const [users, setUsers] = useState<User[]>([]);
	const [activeUser, setActiveUser] = useState<User | undefined>(undefined);
	const [lastToastId, setLastToastId] = useState<string>('');

	const contextValue: UserContextType = useMemo(() => {
		const addUser = (user: User) => {};
		return { addUser };
	}, []);

	return (
		<>
			<LoginContext.Provider value={contextValue}>
				{activeUser ? props.children : <Login />}
			</LoginContext.Provider>
		</>
	);
};
