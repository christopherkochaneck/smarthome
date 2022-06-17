import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import axios from 'axios';

type Group = {
	type: 'group';
	name: string;
	ids: string[];
};

interface GroupContextType {
	groups: Group[];
	setGroups: Dispatch<SetStateAction<Group[]>>;
}

const GroupContext = createContext<GroupContextType>(undefined!);

export function useGroups() {
	return useContext(GroupContext);
}

export const GroupProvider: FC = (props) => {
	const [groups, setGroups] = useState<Group[]>([]);

	const fetchData = async () => {
		const groupRes = await axios({ method: 'get', url: 'http://localhost:3000/api/group' });
		setGroups(groupRes.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		//saveJSON
	}, [groups]);

	const contextValue: GroupContextType = { groups, setGroups };

	return (
		<>
			<GroupContext.Provider value={contextValue}>{props.children}</GroupContext.Provider>
		</>
	);
};
