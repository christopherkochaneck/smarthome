import { useRouter } from 'next/router';
import { FC, FormEvent, useState } from 'react';
import { useGroups } from '../../context/GroupContext';
import { GroupType } from '../../types/GroupType';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import { Input } from '../ui/input/input';
import { DeviceFloppy } from 'tabler-icons-react';
import { Rgbw2Devices } from '../util/rgbw2devices';
import { PlugSDevices } from '../util/plugSdevices';

export const GroupForm: FC = () => {
	const { addGroup } = useGroups();
	const [groupName, setGroupName] = useState<string>('');
	const [ids, setIds] = useState<string[]>([]);
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let group: GroupType = {
			_id: '',
			name: groupName,
			ids: ids,
		};
		addGroup(group);

		router.push('/groups');
	};

	const handleAddDevice = (key: any) => {
		let idArray = ids;
		if (ids.find((x) => x === key._id)) {
			idArray.splice(ids.indexOf(key._id!), 1);
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
						onChange={(e) => {
							setGroupName(e.currentTarget.value);
						}}
					/>
					<div className="text-white text-center">Select Devices to Add</div>
					<Rgbw2Devices selectedIds={ids} function={handleAddDevice} />
					<PlugSDevices selectedIds={ids} function={handleAddDevice} />
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
