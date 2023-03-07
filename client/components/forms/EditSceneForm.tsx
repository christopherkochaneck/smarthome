import { useRouter } from 'next/router';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import { Action, SceneType } from '../../types/SceneType';
import { Input } from '../ui/input/input';
import { LightActionCard } from '../devices/actionCard/lightActionCard';
import { useScenes } from '../../context/SceneContext';
import { ArrowNarrowLeft, ArrowNarrowRight, DeviceFloppy } from 'tabler-icons-react';
import { PlugActionCard } from '../devices/actionCard/plugActionCard';
import { PlugSDevices } from '../util/plugSdevices';
import { Rgbw2Devices } from '../util/rgbw2devices';
import { Backdrop } from '../ui/backdrop/Backdrop';
import { CircularColorSelector } from '../ui/modals/cirucularColorSelector/CircularColorSelector';
import color from '../../interfaces/color';

export const EditSceneForm: FC = () => {
	const { devices } = useDevices();
	const { scenes, updateScene } = useScenes();
	const [sceneName, setSceneName] = useState<string>('');
	const [actions, setActions] = useState<Action[]>([]);
	const router = useRouter();
	const [ids, setIds] = useState<string[]>([]);
	const [viewActionPage, setViewActionPage] = useState<boolean>(false);
	const [sceneId, setSceneId] = useState<string>('');
	const [showColorSelector, setShowColorSelector] = useState<boolean>(false);
	const [selectedColor, setSelectedColor] = useState<color | null>(null);
	const [idToSetColor, setIdToSetColor] = useState<string>('');
	const [idToSetState, setIdToSetState] = useState<string>('');

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

	const handleActionAdd = (key: any) => {
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
			actions: { color: null, state: false },
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
	}, []);

	useEffect(() => {
		const action = actions.find((x) => x._id === idToSetColor);
		if (!action) return;
		if (!selectedColor) return;
		action.actions.color = selectedColor;
		setActions([...actions]);
	}, [selectedColor]);

	const mapActionCards = () => {
		return ids.map((key) => {
			const type = devices.find((x) => x._id === key)?.type;
			switch (type) {
				case 'rgbw2':
					return (
						<LightActionCard
							selectedColor={actions.find((x) => x._id === key)!.actions.color}
							id={key}
							key={key}
							state={actions.find((x) => x._id === key)!.actions.state}
							onIndicatorClick={() => {
								setShowColorSelector(true);
								setIdToSetColor(key);
							}}
							onToggle={(state) => (actions.find((x) => x._id === key)!.actions.state = state)}
						/>
					);
				case 'plugs':
					return (
						<PlugActionCard
							id={key}
							key={key}
							state={actions.find((x) => x._id === key)!.actions.state}
							onToggle={(state) => (actions.find((x) => x._id === key)!.actions.state = state)}
						/>
					);
				default:
					break;
			}
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				{showColorSelector && (
					<Backdrop
						onClick={() => {
							setShowColorSelector(false);
							setSelectedColor(null);
						}}
						className="flex items-center justify-center"
					>
						<CircularColorSelector
							setSelectedColor={setSelectedColor}
							setShowColorSelector={setShowColorSelector}
						/>
					</Backdrop>
				)}
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
					<Rgbw2Devices selectedIds={ids} function={handleActionAdd} />
					<PlugSDevices selectedIds={ids} function={handleActionAdd} />
				</div>
				<div className={`grid gap-4 ${!viewActionPage ? 'hidden' : 'block'}`}>
					<>{mapActionCards()}</>
				</div>
				{viewActionPage && (
					<FloatingActionButton
						className="bg-black absolute left-4 bottom-20 text-white"
						type="button"
						onClick={() => setViewActionPage(false)}
					>
						<ArrowNarrowLeft className="h-8 w-8" />
					</FloatingActionButton>
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
