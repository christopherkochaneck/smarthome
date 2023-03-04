import { FC, useEffect, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { useGroups } from '../../context/GroupContext';
import { RGBW2 } from '../../devices/rgbw2';
import color from '../../interfaces/color';
import { Card } from '../ui/card/card';
import { ToggleSwitch } from '../ui/toggleSwitch/toggleSwitch';
import Hammer from 'react-hammerjs';
import { PlugS } from '../../devices/plugS';
import { Bulb, Plug } from 'tabler-icons-react';
import { io } from 'socket.io-client';
import { HT } from '../../devices/ht';

interface Props {
	groupID: string;
	groupName: string;
	title: string;
	onLongPress: () => void;
	onLightIconPress: () => void;
}

export const GroupCard: FC<Props> = (props) => {
	const { devices } = useDevices();
	const { groups } = useGroups();

	const [entities, setEntities] = useState<any[]>([]);
	const [color, setColor] = useState<color>();
	const [selectedColor, setSelectedColor] = useState<color | null>(null);
	const [state, setState] = useState<boolean | null>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [updating, setUpdating] = useState<boolean>(false);

	const toggleState = async (deviceState: boolean) => {
		try {
			setUpdating(true);
			await Promise.all(
				entities.map(async ({ ipAdress, _id, type }) => {
					let deviceInstance;

					if (!ipAdress) return;
					switch (type) {
						case 'rgbw2':
							deviceInstance = new RGBW2(ipAdress, _id);
							break;
						case 'plugs':
							deviceInstance = new PlugS(ipAdress, _id);
							break;
						case 'ht':
							deviceInstance = new HT(ipAdress, _id);
					}
					if (!deviceInstance) return;
					deviceState ? await deviceInstance!.turnOn() : await deviceInstance!.turnOff();
				})
			);
			setState(deviceState);
		} catch (err) {
			console.error(err);
		} finally {
			setUpdating(false);
		}
	};

	async function handleGroupTap() {
		if (!entities) {
			return;
		}

		if (state) {
			await toggleState(false);
		} else {
			await toggleState(true);
		}
	}

	const stateArray: { hostname: string; state: any }[] = [];
	useEffect(() => {
		const group = groups.find((x) => x._id === props.groupID);
		if (!group) return;

		const devicesInGroup = devices.filter((device) => group.ids.includes(device._id!));
		setEntities(devicesInGroup);

		const colorArray: color[] = [];

		devicesInGroup.forEach((entity) => {
			const deviceType = devices.find((x) => x._id === entity._id)?.type;
			const socketClient = io('http://localhost:3002/', { query: { id: entity._id } });
			if (!entity._id) return;
			socketClient.on(entity._id, (deviceData: any) => {
				const { hostname, state, color } = deviceData;
				const stateIndex = stateArray.findIndex((x) => x.hostname === hostname);
				if (stateIndex > -1) {
					stateArray[stateIndex].state = state;
				} else {
					stateArray.push({ hostname, state });
				}
				if (deviceType === 'rgbw2' && color) {
					colorArray.push(color);
					setColor(colorArray[0]);
				}
				console.log(deviceData.state);
				setState(stateArray.some((x) => x.state));
			});
		});
		return () => {
			const socketClient = io('http://localhost:3002/');
			socketClient.removeAllListeners();
		};
	}, []);

	useEffect(() => {
		if (!entities) {
			return;
		}
		entities.forEach((device: RGBW2 | PlugS) => {
			if (selectedColor === null) return;
			if (device instanceof RGBW2) {
				device.setColor(selectedColor);
			}
		});
	}, [selectedColor, entities]);

	return (
		<>
			<Hammer
				onPress={props.onLongPress}
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
				<div className="h-full w-translate-y-full items-center">
					<Card className="flex flex-row gap-x-3 p-3">
						<div
							style={{
								color: state && color ? `rgb(${color.red}, ${color.green}, ${color.blue})` : '#000',
							}}
						>
							<div
								onClick={(e) => {
									e.stopPropagation();
									if (entities.some((device) => device instanceof RGBW2)) {
										setOpen(!open);
									}
								}}
							>
								{entities.some((device) => device.type === 'rgbw2') ? (
									<Bulb className="h-10 w-10" onClick={props.onLightIconPress} />
								) : (
									<Plug className="h-10 w-10" />
								)}
							</div>
						</div>
						<div
							onClick={handleGroupTap}
							className="flex flex-row place-content-between items-center w-full"
						>
							<div className="text-white text-left">Test</div>
							<ToggleSwitch state={state} setState={setState} className="border border-darkgrey" />
						</div>
					</Card>
				</div>
			</Hammer>
		</>
	);
};
