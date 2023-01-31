import { FC, useEffect, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { useScenes } from '../../context/SceneContext';
import { PlugS } from '../../devices/plugS';
import { RGBW2 } from '../../devices/rgbw2';
import { SceneType } from '../../types/SceneType';
import { Card } from '../ui/card/card';
import Hammer from 'react-hammerjs';
import { Device } from '../../types/Device';

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

		if (!scene) return;

		scene.actions.forEach(async (action) => {
			const device = devices.find((x) => x._id === action._id);
			if (!device) return;

			const entity = createEntity(device);
			if (!entity) return;

			if (action.actions.state !== undefined) {
				action.actions.state ? await entity.turnOn() : await entity.turnOff();
			}

			if (entity instanceof PlugS) return;

			if (action.actions.color) {
				await entity.setColor(action.actions.color);
			}
		});
	};

	function createEntity(device: Device) {
		switch (device.type) {
			case 'rgbw2':
				return new RGBW2(device.ipAdress, device._id!);
			case 'plugS':
				return new PlugS(device.ipAdress, device._id!);
			default:
				return null;
		}
	}

	useEffect(() => {
		const scene = scenes.find((x) => x._id === props.sceneID);
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
