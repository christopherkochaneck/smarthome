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
import { BASE_URL } from '../config/env';

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
			url: `${BASE_URL}/api/group`,
		});
		setGroups(groupRes.data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const addGroup = async (group: GroupType) => {
		await axios({
			method: 'post',
			url: `${BASE_URL}/api/group`,
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
