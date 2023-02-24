import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import axios from 'axios';
import { GroupType } from '../types/GroupType';
import { BASE_URL } from '../config/env';
import { useSession } from 'next-auth/react';

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
	const session = useSession();
	const [groups, setGroups] = useState<GroupType[]>([]);

	const fetchData = async () => {
		const groupRes = await axios({
			method: 'get',
			url: `${BASE_URL}/api/group`,
			headers: { Authorization: session.data?.jwt! },
		});
		setGroups(groupRes.data);
	};

	useEffect(() => {
		if (!session.data?.jwt) return;
		fetchData();
	}, [session]);

	const contextValue: GroupContextType = useMemo(() => {
		const addGroup = async (group: GroupType) => {
			const res = await axios({
				method: 'post',
				url: `${BASE_URL}/api/group`,
				headers: { Authorization: session.data?.jwt! },
				data: group,
			});

			let createdGroup: GroupType = {
				_id: res.data._id,
				name: res.data.name,
				ids: res.data.ids,
			};

			setGroups([...groups, createdGroup]);
		};

		const updateGroup = async (group: GroupType) => {
			await axios({
				method: 'patch',
				url: `${BASE_URL}/api/group/${group._id}`,
				headers: { Authorization: session.data?.jwt! },
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
				headers: { Authorization: session.data?.jwt! },
			});

			setGroups([...groups]);
		};
		return {
			groups,
			setGroups,
			addGroup,
			updateGroup,
			deleteGroup,
		};
	}, [groups, setGroups]);

	return (
		<>
			<GroupContext.Provider value={contextValue}>{props.children}</GroupContext.Provider>
		</>
	);
};
