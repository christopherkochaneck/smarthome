import { FC, useEffect, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { useScenes } from '../../context/SceneContext';
import { PlugS } from '../../devices/plugS';
import { RGBW2 } from '../../devices/rgbw2';
import { SceneType } from '../../types/SceneType';
import { Card } from '../ui/card/card';
import Hammer from 'react-hammerjs';

interface Props {
	id?: string;
	name: string;
	sceneID: string;
	onLongPress: () => void;
}

export const SceneCard: FC<Props> = (props) => {
	const { scenes } = useScenes();
	const { devices } = useDevices();

	const [scene, setScene] = useState<SceneType>();
	const handleScene = async () => {
		if (!scene) {
			return;
		}

		scene.actions.map(async (action) => {
			const device = devices.find((x) => x.id == action.id);

			if (!device) {
				return;
			}

			if (device.type == 'rgbw2') {
				const entity = new RGBW2(device.ipAdress, device.id);

				if (action.actions.state !== undefined) {
					if (action.actions.state === true) {
						await entity.turnOn();
					} else if (action.actions.state === false) {
						await entity.turnOff();
					}
				}

				if (action.actions.color !== undefined) {
					await entity.setColor(action.actions.color);
				}
			} else if (device.type == 'plugS') {
				const entity = new PlugS(device.ipAdress, device.id);

				if (action.actions.state == undefined) return;

				action.actions.state ? await entity.turnOn() : await entity.turnOff();
			}
		});
	};

	useEffect(() => {
		const scene = scenes.find((x) => x.id == props.sceneID);
		setScene(scene);
	}, [props.sceneID, scenes]);

	return (
		<>
			<Hammer
				onPress={props.onLongPress}
				onTap={handleScene}
				options={{
					touchAction: 'compute',
					recognizers: {
						press: {
							time: 500,
							threshold: 1000,
						},
					},
				}}
			>
				<div className="h-[179px] w-full">
					<Card>
						<div className="grid items-center">
							<div className="text-zinc-400">{props.name}</div>
						</div>
					</Card>
				</div>
			</Hammer>
		</>
	);
};
