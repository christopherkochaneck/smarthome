import { useRouter } from 'next/router';
import { FC, FormEvent, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { useGroups } from '../../context/GroupContext';
import { GroupType } from '../../types/GroupType';
import { LightSelectionCard } from '../devices/selectionCard/lightSelectionCard';
import { PlugSelectionCard } from '../devices/selectionCard/PlugSelectionCard';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import { Input } from '../ui/input/input';
import DeviceFloppy from '../../res/images/device-floppy.svg';
import { v4 as uuidv4 } from 'uuid';

export const GroupForm: FC = () => {
	const { devices } = useDevices();
	const { addGroup } = useGroups();
	const [groupName, setGroupName] = useState<string>('');
	const [ids, setIds] = useState<string[]>([]);
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let group: GroupType = {
			id: uuidv4(),
			name: groupName,
			ids: ids,
		};
		addGroup(group);

		router.push('/groups');
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="text-white">
					<button type="button" onClick={() => router.push('/add/addScene')}>
						Click here to create a Scene
					</button>
				</div>
				<div className="grid gap-4">
					<Input
						title="Group Name"
						className="h-10 rounded-xl"
						onChange={(e) => {
							setGroupName(e.currentTarget.value);
						}}
					/>
					<div className="text-zinc-700 text-center">Select Devices to Add</div>
					{devices.map((key) => {
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
						if (key.type === 'plugS') {
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
