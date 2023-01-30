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
import { ArrowNarrowLeft, ArrowNarrowRight, DeviceFloppy } from 'tabler-icons-react';
import { RGBW2Type } from '../../types/RGBW2Type';
import { PlugSType } from '../../types/PlugSType';

export const EditSceneForm: FC = () => {
	const { devices } = useDevices();
	const { scenes, updateScene } = useScenes();
	const [sceneName, setSceneName] = useState<string>('');
	const [actions, setActions] = useState<Action[]>([]);
	const router = useRouter();
	const [ids, setIds] = useState<string[]>([]);
	const [viewActionPage, setViewActionPage] = useState<boolean>(false);
	const [sceneId, setSceneId] = useState<string>('');

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!viewActionPage) {
			setViewActionPage(true);
			return;
		}

		let scene: SceneType = {
			_id: sceneId,
			name: sceneName,
			actions: actions,
		};

		updateScene(scene);

		router.push('/groups');
	};

	const handleActionAdd = (key: RGBW2Type | PlugSType) => {
		let idArray = ids;
		if (ids.find((x) => x === key._id)) {
			idArray.splice(ids.indexOf(key._id!), 1);
		} else {
			idArray.push(key._id!);
		}
		setIds(idArray);

		const action: Action = {
			_id: key._id!,
			type: key.type,
			actions: { color: { red: 100, green: 0, blue: 0 }, state: false },
		};

		if (actions.find((x) => x._id === key._id)) {
			actions.splice(actions.findIndex((x) => x._id === key._id));
		} else {
			actions.push(action);
		}

		setActions([...actions]);
	};

	useEffect(() => {
		setViewActionPage(false);

		const _id = router.query._id;

		if (_id !== undefined) {
			setSceneId(_id.toString());
		}

		const scene = scenes.find((x) => x._id === _id);

		if (scene === undefined) {
			return;
		}

		setSceneName(scene.name);

		scene.actions.forEach((key) => {
			setIds((prev) => [...prev, key._id]);
		});

		setActions([...scene.actions]);
	}, [router.query, scenes]);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className={`grid gap-4 ${!viewActionPage ? 'block' : 'hidden'}`}>
					<Input
						title="Scene Name"
						className="h-10 rounded-xl"
						value={sceneName}
						onChange={(e) => {
							setSceneName(e.currentTarget.value);
						}}
					/>
					<div className="text-white text-center">Select Devices to Add</div>
					{devices.map((key) => {
						if (key.type === 'rgbw2') {
							return (
								<div onClick={() => handleActionAdd(key)} key={key._id}>
									<LightSelectionCard
										id={key._id!}
										key={key._id}
										name={key.title}
										selected={ids.includes(key._id!)}
									/>
								</div>
							);
						}
						if (key.type === 'plugS') {
							return (
								<div onClick={() => handleActionAdd(key)} key={key._id}>
									<PlugSelectionCard
										id={key._id!}
										key={key._id!}
										name={key.title}
										selected={ids.includes(key._id!)}
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
				{viewActionPage ? (
					<FloatingActionButton
						className="bg-black absolute left-4 bottom-20 text-white"
						type="button"
						onClick={() => setViewActionPage(false)}
					>
						<ArrowNarrowLeft className="h-8 w-8" />
					</FloatingActionButton>
				) : (
					<></>
				)}

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
