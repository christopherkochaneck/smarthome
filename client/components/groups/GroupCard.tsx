import { FC, useEffect, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { useGroups } from '../../context/GroupContext';
import { RGBW2 } from '../../devices/rgbw2';
import color from '../../interfaces/color';
import { Card } from '../ui/card/card';
import { RGBW2Modal } from '../ui/modals/rgbw2Modal/RGBW2Modal';
import { ToggleSwitch } from '../ui/toggleSwitch/toggleSwitch';
import Hammer from 'react-hammerjs';
import { PlugS } from '../../devices/plugS';
import { Bulb, Plug } from 'tabler-icons-react';

interface Props {
	groupID: string;
	groupName: string;
	title: string;
	onLongPress: () => void;
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

	async function handleGroupTap() {
		if (!entities) {
			return;
		}

		if (state) {
			try {
				setUpdating(true);
				Promise.all(
					entities.map(async (device: RGBW2 | PlugS) => {
						await device.turnOff();
					})
				);
				setState(false);
			} catch (err) {
				console.error(err);
			} finally {
				setUpdating(false);
			}
		} else {
			try {
				setUpdating(true);
				Promise.all(
					entities.map(async (device: RGBW2 | PlugS) => {
						await device.turnOn();
					})
				);
				setState(false);
			} catch (err) {
				console.error(err);
			} finally {
				setUpdating(false);
			}
		}

		let stateArray: boolean[] = [];
		entities.forEach((device: RGBW2 | PlugS) => {
			stateArray.push(device.state);
		});
		setColor(color);
	}

	useEffect(() => {
		const group = groups.find((x) => x._id === props.groupID);

		if (group === undefined) {
			return;
		}

		let stateArray: boolean[] = [];
		let colorArray: color[] = [];

		group.ids.forEach((id) => {
			const res = devices.find((x) => x._id === id);

			if (res === undefined) {
				return;
			}

			let device: RGBW2 | PlugS;
			switch (res.type) {
				case 'rgbw2':
					device = new RGBW2(res.ipAdress, res._id!);
					break;
				case 'plugS':
					device = new PlugS(res.ipAdress, res._id!);
					break;
				default:
					return;
			}

			entities.push(device);
		});

		const interval = setInterval(async () => {
			stateArray = [];
			colorArray = [];

			if (updating) {
				return;
			}

			entities.forEach((device: RGBW2 | PlugS) => {
				device.fetchCurrentDeviceData();

				stateArray.push(device.state);

				if (device instanceof RGBW2) {
					colorArray.push(device.color);
				}
			});

			if (stateArray.includes(true)) {
				setState(true);
			}

			if (stateArray.every((x) => x === false)) {
				setState(false);
			}

			setEntities(entities);
			setColor(colorArray[0]);
		}, 400);
		return () => {
			clearInterval(interval);
		};
	}, [devices, groups, props.groupID, entities, updating]);

	useEffect(() => {
		if (!entities) {
			return;
		}
		entities.forEach((device: RGBW2 | PlugS) => {
			if (device instanceof RGBW2) {
				device.setColor(selectedColor!);
			}
		});
	}, [selectedColor, entities]);

	return (
		<>
			<RGBW2Modal open={open} setOpen={setOpen} setSelectedColor={setSelectedColor} />
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
								{entities.some((device) => device instanceof RGBW2) ? (
									<Bulb className="h-10 w-10" />
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
