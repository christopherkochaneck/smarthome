import { useRouter } from 'next/router';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import { Action, SceneType } from '../../types/SceneType';
import { Input } from '../ui/input/input';
import { LightSelectionCard } from '../devices/selectionCard/lightSelectionCard';
import { PlugSelectionCard } from '../devices/selectionCard/PlugSelectionCard';
import { LightActionCard } from '../devices/actionCard/lightActionCard';
import { useScenes } from '../../context/SceneContext';
import { ArrowNarrowRight, DeviceFloppy } from 'tabler-icons-react';
import { PlugSType } from '../../types/PlugSType';
import { RGBW2Type } from '../../types/RGBW2Type';

export const SceneForm: FC = () => {
	const { devices } = useDevices();
	const { addScene } = useScenes();
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
					{devices.map((key) => {
						if (key.type === 'rgbw2' && key._id !== undefined) {
							return (
								<div onClick={() => handleAddAction(key)} key={key._id}>
									<LightSelectionCard
										id={key._id}
										key={key._id}
										name={key.title}
										selected={ids.includes(key._id)}
									/>
								</div>
							);
						}
						if (key.type === 'plugS' && key._id !== undefined) {
							return (
								<div
									onClick={() => {
										handleAddAction(key);
									}}
									key={key._id}
								>
									<PlugSelectionCard
										id={key._id}
										key={key._id}
										name={key.title}
										selected={ids.includes(key._id)}
									/>
								</div>
							);
						}
					})}
				</div>
				<div className={`grid gap-4 ${!viewActionPage ? 'hidden' : 'block'}`}>
					{ids.map((key) => {
						return <LightActionCard id={key} key={key} actions={actions} setActions={setActions} />;
					})}
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
