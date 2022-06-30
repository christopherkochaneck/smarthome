import { FC, FormEvent, useEffect, useState } from 'react';
import { GroupType } from '../../types/GroupType';
import { v4 as uuidv4 } from 'uuid';
import { useGroups } from '../../context/GroupContext';
import router from 'next/router';
import { Input } from '../ui/input/input';
import { useDevices } from '../../context/DeviceContext';
import { LightSelectionCard } from '../devices/selectionCard/lightSelectionCard';
import { PlugSelectionCard } from '../devices/selectionCard/PlugSelectionCard';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import DeviceFloppy from '../../res/images/device-floppy.svg';

interface Props {}
export const EditGroupForm: FC<Props> = (props) => {
	const { groups, updateGroup } = useGroups();
	const devices = useDevices();
	const [groupName, setGroupName] = useState<string>('');
	const [ids, setIds] = useState<string[]>([]);
	const [groupId, setGroupId] = useState<string>('');

	useEffect(() => {
		const id = router.query.id;

		if (id == undefined) {
			return;
		}
		setGroupId(id.toString());

		const foundID = groups.find((x) => x.id === id);

		if (foundID == undefined) {
			return;
		}

		setGroupName(foundID.name);
		setIds(foundID.ids);
	}, [groups]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let group: GroupType = {
			id: groupId,
			name: groupName,
			ids: ids,
		};
		updateGroup(group);

		router.push('/groups');
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
					<div className="text-zinc-700 text-center">Select Devices to Add</div>
					{devices.devices.map((key) => {
						if (key.type === 'rgbw2') {
							return (
								<div
									onClick={() => {
										let idArray = ids;
										if (ids.find((x) => x === key.id)) {
											idArray.splice(ids.indexOf(key.id), 1);
										} else {
											idArray.push(key.id);
										}

										setIds([...idArray]);
									}}
									key={key.id}
								>
									<LightSelectionCard
										id={key.id}
										key={key.id}
										name={key.title}
										selected={ids.includes(key.id)}
									/>
								</div>
							);
						}
						if ((key.type = 'plugS')) {
							return (
								<div
									onClick={() => {
										let idArray = ids;
										if (ids.find((x) => x === key.id)) {
											idArray.splice(ids.indexOf(key.id));
										} else {
											idArray.push(key.id);
										}
										setIds(idArray);
									}}
								>
									<PlugSelectionCard
										id={key.id}
										key={key.id}
										name={key.title}
										selected={ids.includes(key.id)}
									/>
								</div>
							);
						}
					})}
				</div>
				<FloatingActionButton
					className="bg-black absolute right-4 bottom-20 text-zinc-700"
					type="submit"
				>
					<DeviceFloppy />
				</FloatingActionButton>
			</form>
		</>
	);
};
