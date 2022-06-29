import { FC, useEffect, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { useGroups } from '../../context/GroupContext';
import { RGBW2 } from '../../devices/rgbw2';
import color from '../../interfaces/color';
import LightIcon from '../../res/images/bulb.svg';
import { Card } from '../ui/card/card';
import { RGBW2Modal } from '../ui/modals/rgbw2Modal/RGBW2Modal';
import { ToggleSwitch } from '../ui/toggleSwitch/toggleSwitch';
import Hammer from 'react-hammerjs';

interface Props {
	groupID: string;
	groupName: string;
	title: string;
	onLongPress: () => void;
}

export const GroupLightCard: FC<Props> = (props) => {
	const devices = useDevices();
	const groups = useGroups();

	const [lights, setLights] = useState<RGBW2[]>([]);
	const [color, setColor] = useState<color>();
	const [selectedColor, setSelectedColor] = useState<color | undefined>(undefined);
	const [state, setState] = useState<boolean>(false);
	const [states, setStates] = useState<boolean[]>();
	const [open, setOpen] = useState<boolean>(false);
	const [updating, setUpdating] = useState<boolean>(false);

	async function handleGroupTap() {
		async () => {
			if (!lights) {
				return;
			}

			if (state) {
				try {
					setUpdating(true);
					await Promise.all(
						lights.map(async (device: RGBW2) => {
							return await device.turnOff();
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
					await Promise.all(
						lights.map(async (device: RGBW2) => {
							return await device.turnOn();
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
			lights.map((device: RGBW2) => {
				stateArray.push(device.state);
			});
			setStates([...stateArray]);
			setColor(color);
		};
	}

	useEffect(() => {
		const group = groups.groups.find((x) => x.id == props.groupID);

		if (group == undefined) {
			return;
		}

		let lightArray: RGBW2[] = [];
		let stateArray: boolean[] = [];
		let colorArray: color[] = [];

		group.ids.map((id) => {
			const res = devices.devices.find((x) => x.id == id);

			if (res == undefined) {
				return;
			}

			const device = new RGBW2(res.ipAdress, res.id);

			lightArray.push(device);
		});

		const interval = setInterval(async () => {
			stateArray = [];
			colorArray = [];

			if (updating) {
				return;
			}

			lightArray.map((device: RGBW2) => {
				device.fetchCurrentDeviceData();

				stateArray.push(device.state);
				colorArray.push(device.color);
			});

			if (stateArray.includes(true)) {
				setState(true);
			}

			if (stateArray.every((x) => x == false)) {
				setState(false);
			}

			setLights(lightArray);
			setColor(colorArray[0]);
		}, 150);
		return () => {
			clearInterval(interval);
		};
	}, [devices.devices, groups.groups, props.groupID, updating]);

	useEffect(() => {
		if (!lights) {
			return;
		}
		lights.map((device: RGBW2) => {
			device.setColor(selectedColor!);
		});
	}, [selectedColor, lights]);

	return (
		<>
			<RGBW2Modal open={open} setOpen={setOpen} setSelectedColor={setSelectedColor} />
			<Hammer
				onPress={props.onLongPress}
				onTap={handleGroupTap}
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
				<div className="h-full w-translate-y-full">
					<Card>
						<div
							style={{
								color: state && color ? `rgb(${color.red}, ${color.green}, ${color.blue})` : '#000',
								display: 'grid',
								gridTemplateColumns: 'max-content 1fr max-content',
								gridTemplateRows: 'repeat(2, max-content)',
								columnGap: '10px',
								padding: '10px',
							}}
						>
							<div
								style={{ gridArea: '1 / 1 / 3 / 2' }}
								onClick={(e) => {
									e.stopPropagation();
									setOpen(!open);
								}}
							>
								<LightIcon />
							</div>
							<div className="text-zinc-400 text-left">{props.title}</div>
							<div
								style={{
									gridArea: '1 / 3 / 3 / 4',
									alignSelf: 'center',
								}}
							>
								<ToggleSwitch state={state} setState={setState} />
							</div>
						</div>
					</Card>
				</div>
			</Hammer>
		</>
	);
};
