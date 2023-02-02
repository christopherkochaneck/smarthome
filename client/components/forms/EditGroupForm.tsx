import { FC, FormEvent, useEffect, useState } from 'react';
import { GroupType } from '../../types/GroupType';
import { useGroups } from '../../context/GroupContext';
import router from 'next/router';
import { Input } from '../ui/input/input';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import { DeviceFloppy } from 'tabler-icons-react';
import { Rgbw2Devices } from '../util/rgbw2devices';
import { PlugSDevices } from '../util/plugSdevices';

export const EditGroupForm: FC = () => {
	const { groups, updateGroup } = useGroups();
	const [groupName, setGroupName] = useState<string>('');
	const [ids, setIds] = useState<string[]>([]);
	const [groupId, setGroupId] = useState<string>('');

	useEffect(() => {
		const _id = router.query._id;

		if (_id === undefined) {
			return;
		}
		setGroupId(_id.toString());

		const foundID = groups.find((x) => x._id === _id);

		if (foundID === undefined) {
			return;
		}

		setGroupName(foundID.name);
		setIds(foundID.ids);
	}, [groups]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let group: GroupType = {
			_id: groupId,
			name: groupName,
			ids: ids,
		};
		updateGroup(group);

		router.push('/groups');
	};

	const handleIdEdit = (key: any) => {
		let idArray = ids;
		if (ids.find((x) => x === key._id)) {
			idArray.splice(ids.indexOf(key._id), 1);
		} else {
			idArray.push(key._id!);
		}
		setIds(idArray);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="grid gap-4">
					<Input
						title="Group Name"
						className="h-10 rounded-xl"
						value={groupName}
						onChange={(e) => {
							setGroupName(e.currentTarget.value);
						}}
					/>
					<div className="text-white text-center">Select Devices to Add</div>
					<Rgbw2Devices selectedIds={ids} function={handleIdEdit} />
					<PlugSDevices selectedIds={ids} function={handleIdEdit} />
				</div>
				<FloatingActionButton
					className="bg-black absolute right-4 bottom-20 text-white"
					type="submit"
				>
					<DeviceFloppy className="h-8 w-8" />
				</FloatingActionButton>
			</form>
		</>
	);
};
