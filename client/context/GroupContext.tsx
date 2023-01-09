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
import React from 'react';

interface GroupContextType {
	groups: GroupType[];
	setGroups: Dispatch<SetStateAction<GroupType[]>>;
	addGroup: (group: GroupType) => void;
	updateGroup: (group: GroupType) => void;
	deleteGroup: (group: GroupType) => void;
}

interface Props {
	children?: React.ReactNode;
}

const GroupContext = createContext<GroupContextType>(undefined!);

export function useGroups() {
	return useContext(GroupContext);
}

export const GroupProvider: FC<Props> = (props) => {
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

	const updateGroup = async (group: GroupType) => {
		await axios({
			method: 'patch',
			url: `${BASE_URL}/api/group`,
			data: group,
		});

		const index = groups.findIndex((x) => x._id === group._id);

		groups[index] = group;

		setGroups([...groups]);
	};

	const deleteGroup = async (group: GroupType) => {
		const index = groups.findIndex((x) => x._id === group._id);

		groups.splice(index, 1);

		await axios({
			method: 'delete',
			url: `${BASE_URL}/api/group/${group._id}`,
		});

		setGroups([...groups]);
	};

	const contextValue: GroupContextType = { groups, setGroups, addGroup, updateGroup, deleteGroup };

	return (
		<>
			<GroupContext.Provider value={contextValue}>{props.children}</GroupContext.Provider>
		</>
	);
};
