import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { FloatingActionButton } from '../components/ui/floatingActionButton/floatingActionButton';
import { Input } from '../components/ui/input/input';
import DiskFloppy from '../res/images/device-floppy.svg';
import { useDevices } from '../context/DeviceContext';
import { LightSelectionCard } from '../components/devices/selectionCard/lightSelectionCard';
import { PlugSelectionCard } from '../components/devices/selectionCard/PlugSelectionCard';
import { useGroups } from '../context/GroupContext';
import { GroupType } from '../types/GroupType';

const AddGroup: NextPage = () => {
	const devices = useDevices();
	const groups = useGroups();
	const [groupName, setGroupName] = useState<string>('');
	const [ids, setIds] = useState<string[]>([]);
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let group: GroupType = {
			name: groupName,
			ids: ids,
		};
		groups.addGroup(group);

		router.push('/groups');
	};

	return (
		<LayoutWrapper showAppbar={true} showAppbarIcon={true} appBarTitle="Add Group">
			<form onSubmit={handleSubmit}>
				<div className="grid gap-4">
					<Input
						title="Group Name"
						className="h-10 rounded-xl"
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
											idArray.splice(ids.indexOf(key.id));
										} else {
											idArray.push(key.id);
										}
										setIds(idArray);
									}}
								>
									<LightSelectionCard id={key.id} key={key.id} name={key.title} />
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
									<PlugSelectionCard id={key.id} key={key.id} name={key.title} />
								</div>
							);
						}
					})}
				</div>
				<FloatingActionButton
					className="bg-black absolute right-4 bottom-20 text-zinc-700"
					type="submit"
				>
					<DiskFloppy />
				</FloatingActionButton>
			</form>
		</LayoutWrapper>
	);
};

export default AddGroup;
