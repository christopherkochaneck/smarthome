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
			id: sceneId,
			name: sceneName,
			actions: actions,
		};

		updateScene(scene);

		router.push('/groups');
	};

	useEffect(() => {
		setViewActionPage(false);

		const id = router.query.id;

		if (id != undefined) {
			setSceneId(id.toString());
		}

		const scene = scenes.find((x) => x.id == id);

		if (scene == undefined) {
			return;
		}

		setSceneName(scene.name);

		scene.actions.forEach((key) => {
			setIds((prev) => [...prev, key.id]);
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
								<div
									onClick={() => {
										let idArray = ids;
										if (ids.find((x) => x === key.id)) {
											idArray.splice(ids.indexOf(key.id), 1);
										} else {
											idArray.push(key.id);
										}
										setIds(idArray);

										const action: Action = {
											id: key.id,
											type: 'rgbw2',
											actions: { color: { red: 100, green: 0, blue: 0 }, state: true },
										};

										if (actions.find((x) => x.id === key.id)) {
											actions.splice(actions.findIndex((x) => x.id === key.id));
										} else {
											actions.push(action);
										}

										setActions([...actions]);
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
										setIds(idArray);

										const action: Action = {
											id: key.id,
											type: 'plugS',
											actions: { color: { red: 100, green: 0, blue: 0 }, state: false },
										};

										if (actions.find((x) => x.id === key.id)) {
											actions.splice(actions.findIndex((x) => x.id === key.id));
										} else {
											actions.push(action);
										}

										setActions([...actions]);
									}}
									key={key.id}
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
