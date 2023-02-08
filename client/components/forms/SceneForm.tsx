import { useRouter } from 'next/router';
import { FC, FormEvent, useEffect, useState } from 'react';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import { Action, SceneType } from '../../types/SceneType';
import { Input } from '../ui/input/input';
import { LightActionCard } from '../devices/actionCard/lightActionCard';
import { useScenes } from '../../context/SceneContext';
import { ArrowNarrowRight, DeviceFloppy } from 'tabler-icons-react';
import { PlugSType } from '../../types/PlugSType';
import { RGBW2Type } from '../../types/RGBW2Type';
import { Rgbw2Devices } from '../util/rgbw2devices';
import { PlugSDevices } from '../util/plugSdevices';
import { useDevices } from '../../context/DeviceContext';
import { PlugActionCard } from '../devices/actionCard/plugActionCard';

export const SceneForm: FC = () => {
	const { addScene } = useScenes();
	const { devices } = useDevices();
	const [sceneName, setSceneName] = useState<string>('');
	const [actions, setActions] = useState<Action[]>([]);
	const router = useRouter();
	const [ids, setIds] = useState<string[]>([]);
	const [viewActionPage, setViewActionPage] = useState<boolean>(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!viewActionPage) {
			setViewActionPage(true);
			return;
		}

		let scene: SceneType = {
			name: sceneName,
			actions: actions,
		};
		addScene(scene);

		router.push('/groups');
	};

	function handleAddAction(key: RGBW2Type | PlugSType) {
		let idArray = ids;
		if (ids.find((x) => x === key._id!)) {
			idArray.splice(ids.indexOf(key._id!), 1);
		} else {
			idArray.push(key._id!);
		}

		setIds(idArray);

		const action: Action = {
			_id: key._id!,
			type: key.type,
			actions: { color: { red: 0, green: 0, blue: 0 }, state: false },
		};

		if (actions.find((x) => x._id === key._id!)) {
			actions.splice(actions.findIndex((x) => x._id === key._id!));
		} else {
			actions.push(action);
		}

		setActions([...actions]);
	}

	const mapIds = () => {
		return ids.map((key) => {
			const device = devices.find((x) => x._id === key);
			if (!device) return;
			switch (device.type) {
				case 'rgbw2':
					return (
						<LightActionCard id={device._id!} key={key} actions={actions} setActions={setActions} />
					);
				case 'plugs':
					return (
						<PlugActionCard id={device._id!} key={key} actions={actions} setActions={setActions} />
					);
				default:
					break;
			}
		});
	};

	useEffect(() => {
		setViewActionPage(false);
	}, []);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className={`grid gap-4 ${!viewActionPage ? 'block' : 'hidden'}`}>
					<Input
						title="Scene Name"
						className="h-10 rounded-xl"
						onChange={(e) => {
							setSceneName(e.currentTarget.value);
						}}
					/>
					<div className="text-white text-center">Select Devices to Add</div>
					<Rgbw2Devices selectedIds={ids} function={handleAddAction} />
					<PlugSDevices selectedIds={ids} function={handleAddAction} />
				</div>
				<div className={`grid gap-4 ${!viewActionPage ? 'hidden' : 'block'}`}>
					<>{mapIds()}</>
				</div>
				<FloatingActionButton
					className="bg-black absolute right-4 bottom-20 text-white"
					type="submit"
				>
					{viewActionPage ? (
						<DeviceFloppy className="h-8 w-8" />
					) : (
						<ArrowNarrowRight className="h-8 w-8" />
					)}
				</FloatingActionButton>
			</form>
		</>
	);
};
