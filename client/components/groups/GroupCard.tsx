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

	const toggleState = async (on: boolean) => {
		try {
			setUpdating(true);
			await Promise.all(
				entities.map(async (device: RGBW2 | PlugS) => {
					on ? await device.turnOn() : await device.turnOff();
				})
			);
			setState(on);
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

	useEffect(() => {
		const group = groups.find((x) => x._id === props.groupID);
		if (!group) return;

		const devicesInGroup = group.ids
			.map((id) => {
				const res = devices.find((x) => x._id === id);
				if (!res) return;
				switch (res.type) {
					case 'rgbw2':
						return new RGBW2(res.ipAdress, res._id!);
					case 'plugs':
						return new PlugS(res.ipAdress, res._id!);
					default:
						return;
				}
			})
			.filter((d) => d);
		setEntities(devicesInGroup);

		const interval = setInterval(() => {
			if (updating) return;
			const stateArray: boolean[] = [];
			const colorArray: color[] = [];
			entities.forEach((device: RGBW2 | PlugS) => {
				device.fetchCurrentDeviceData();
				stateArray.push(device.state);
				if (device instanceof RGBW2) colorArray.push(device.color);
			});

			setState(stateArray.some((x) => x === true));
			setState(stateArray.includes(true) ? true : null);
			setColor(colorArray[0]);
		}, 400);

		return () => clearInterval(interval);
	}, [devices, groups, props.groupID, updating]);

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
								{entities.some((device) => device instanceof RGBW2) ? (
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
