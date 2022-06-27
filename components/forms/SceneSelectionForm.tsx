import { useRouter } from 'next/router';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { FloatingActionButton } from '../ui/floatingActionButton/floatingActionButton';
import ArrowNarrowRight from '../../res/images/arrow-narrow-right.svg';
import DiskFloppy from '../../res/images/device-floppy.svg';
import { Action, SceneType } from '../../types/SceneType';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '../ui/input/input';
import { LightSelectionCard } from '../devices/selectionCard/lightSelectionCard';
import { PlugSelectionCard } from '../devices/selectionCard/PlugSelectionCard';
import { RGBW2Modal } from '../ui/modals/rgbw2Modal/RGBW2Modal';
import color from '../../interfaces/color';
import { LightActionCard } from '../devices/actionCard/lightActionCard';
import { useScenes } from '../../context/SceneContext';

export const SceneSelectionForm: FC = () => {
	const devices = useDevices();
	const scenes = useScenes();
	const [sceneName, setSceneName] = useState<string>('');
	const [actions, setActions] = useState<Action[]>([]);
	const router = useRouter();
	const [ids, setIds] = useState<string[]>([]);
	const [viewActionPage, setViewActionPage] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!viewActionPage) {
			setViewActionPage(true);
			return;
		}

		let scene: SceneType = {
			id: uuidv4(),
			name: sceneName,
			actions: actions,
		};
		console.log(scene);
		scenes.addScene(scene);

		router.push('/groups');
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
				<div className={`grid gap-4 ${!viewActionPage ? 'hidden' : 'block'}`}>
					{ids.map((key) => {
						return (
							<LightActionCard
								id={key}
								key={key}
								name="Name"
								actions={actions}
								setActions={setActions}
							/>
						);
					})}
				</div>
				<FloatingActionButton
					className="bg-black absolute right-4 bottom-20 text-zinc-700"
					type="submit"
				>
					{viewActionPage ? <DiskFloppy /> : <ArrowNarrowRight />}
				</FloatingActionButton>
			</form>
		</>
	);
};
