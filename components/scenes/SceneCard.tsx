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
	const handleScene = async (e: any) => {
		e.preventDefault();
		if (!scene) {
			return;
		}

		scene.actions.forEach(async (action) => {
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
				options={{
					domEvents: true,
					touchAction: 'compute',
					recognizers: {
						press: {
							time: 500,
							threshold: 1000,
						},
						tap: { event: 'tap' },
					},
				}}
			>
				<div className="h-[179px] w-full" onClick={handleScene}>
					<Card className="flex justify-center items-center">
						<div className="text-white h-max w-max">{props.name}</div>
					</Card>
				</div>
			</Hammer>
		</>
	);
};
