import { FC, FormEvent, useEffect, useState } from 'react';
import { GroupType } from '../../types/GroupType';
import { useGroups } from '../../context/GroupContext';
import router from 'next/router';
import { Input } from '../ui/input/input';
import { useDevices } from '../../context/DeviceContext';
import { LightSelectionCard } from '../devices/selectionCard/lightSelectionCard';
import { PlugSelectionCard } from '../devices/selectionCard/PlugSelectionCard';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import { DeviceFloppy } from 'tabler-icons-react';

export const EditGroupForm: FC = () => {
	const { groups, updateGroup } = useGroups();
	const { devices } = useDevices();
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

	const mapRGBW2Devices = () => {
		return devices
			.filter((x) => x.type === 'rgbw2')
			.map((key: any) => {
				return (
					<div onClick={() => handleIdEdit(key)} key={key._id}>
						<LightSelectionCard
							id={key._id}
							key={key._id}
							name={key.title}
							selected={ids.includes(key._id)}
						/>
					</div>
				);
			});
	};

	const mapPlugSDevices = () => {
		return devices
			.filter((x) => x.type === 'plugS')
			.map((key: any) => {
				return (
					<div onClick={() => handleIdEdit(key)} key={key._id}>
						<PlugSelectionCard
							id={key._id}
							key={key._id}
							name={key.title}
							selected={ids.includes(key._id)}
						/>
					</div>
				);
			});
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
					<>{mapRGBW2Devices()}</>
					<>{mapPlugSDevices()}</>
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
