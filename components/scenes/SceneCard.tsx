import { FC, useEffect, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { useScenes } from '../../context/SceneContext';
import { PlugS } from '../../devices/plugS';
import { RGBW2 } from '../../devices/rgbw2';
import { SceneType } from '../../types/SceneType';
import { Card } from '../ui/card/card';

interface Props {
	id?: string;
	name: string;
	sceneID: string;
}

export const SceneCard: FC<Props> = (props) => {
	const scenes = useScenes();
	const devices = useDevices();

	const [scene, setScene] = useState<SceneType>();
	const handleScene = async () => {
		if (!scene) {
			return;
		}
		scene.actions.map(async (action) => {
			const device = devices.devices.find((x) => x.id == action.id);

			if (!device) {
				return;
			}

			if (device.type == 'rgbw2') {
				const entity = new RGBW2(device.ipAdress, device.id);

				if (action.actions.state == undefined) {
					if (action.actions.color == undefined) return;
					await entity.setColor(action.actions.color);
					if (action.actions.state == true) {
						await entity.turnOn();
					} else if (action.actions.state == false) {
						await entity.turnOff();
					}
				}
			} else if (device.type == 'plugS') {
				const entity = new PlugS(device.ipAdress, device.id);

				if (action.actions.state == undefined) return;

				action.actions.state ? await entity.turnOn() : await entity.turnOff();
			}
		});
	};

	useEffect(() => {
		const scene = scenes.scenes.find((x) => x.id == props.sceneID);
		setScene(scene);
	}, []);

	useEffect(() => {
		const scene = scenes.scenes.find((x) => x.id == props.sceneID);
		setScene(scene);
	}, [scenes]);

	return (
		<>
			<div className="h-[179px] w-full" onClick={handleScene}>
				<Card>
					<div className="grid items-center">
						<div className="text-zinc-400">{props.name}</div>
					</div>
				</Card>
			</div>
		</>
	);
};
