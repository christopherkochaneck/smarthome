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
import { GroupType } from '../types/GroupType';

interface GroupContextType {
	groups: GroupType[];
	setGroups: Dispatch<SetStateAction<GroupType[]>>;
	addGroup: (group: GroupType) => void;
}

const GroupContext = createContext<GroupContextType>(undefined!);

export function useGroups() {
	return useContext(GroupContext);
}

export const GroupProvider: FC = (props) => {
	const [groups, setGroups] = useState<GroupType[]>([]);

	const fetchData = async () => {
		const groupRes = await axios({
			method: 'get',
			url: `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'}/api/group`,
		});
		setGroups(groupRes.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const addGroup = async (group: GroupType) => {
		await axios({
			method: 'post',
			url: `${process.env.NEXT_PUBLIC_API_URL}/api/group`,
			data: group,
		});

		setGroups([...groups, group]);
	};

	const contextValue: GroupContextType = { groups, setGroups, addGroup };

	return (
		<>
			<GroupContext.Provider value={contextValue}>{props.children}</GroupContext.Provider>
		</>
	);
};
