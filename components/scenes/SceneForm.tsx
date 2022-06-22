import { useRouter } from 'next/router';
import { FC, FormEvent, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import DeviceFloppy from '../../res/images/device-floppy.svg';
import { Action, SceneType } from '../../types/SceneType';
import { v4 as uuidv4 } from 'uuid';
import { useScenes } from '../../context/SceneContext';
import { Input } from '../ui/input/input';
import { LightSelectionCard } from '../devices/selectionCard/lightSelectionCard';
import { PlugSelectionCard } from '../devices/selectionCard/PlugSelectionCard';

export const SceneForm: FC = () => {
	const devices = useDevices();
	const scenes = useScenes();
	const [sceneName, setSceneName] = useState<string>('');
	const [actions, setActions] = useState<Action[]>([]);
	const router = useRouter();
	const [ids, setIds] = useState<string[]>([]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let scene: SceneType = {
			id: uuidv4(),
			name: sceneName,
			actions: actions,
		};
		scenes.addScene(scene);

		router.push('/groups');
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="grid gap-4">
					<div className="grid gap-4">
						<Input
							title="Scene Name"
							className="h-10 rounded-xl"
							onChange={(e) => {
								setSceneName(e.currentTarget.value);
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
										key={key.id}
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
