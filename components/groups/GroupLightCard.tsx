import { FC, useEffect, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { useGroups } from '../../context/GroupContext';
import { RGBW2 } from '../../devices/rgbw2';
import color from '../../interfaces/color';
import LightIcon from '../../res/images/bulb.svg';
import { Card } from '../ui/card/card';
import { RGBW2Modal } from '../ui/modals/rgbw2Modal/RGBW2Modal';
import { ToggleSwitch } from '../ui/toggleSwitch/toggleSwitch';

interface Props {
	group: string;
	title: string;
}

export const GroupLightCard: FC<Props> = (props) => {
	const groups = useGroups();
	const devices = useDevices();

	const [lights, setDevices] = useState<RGBW2[]>([]);
	const [color, setColor] = useState<color>();
	const [selectedColor, setSelectedColor] = useState<color | undefined>(undefined);
	const [state, setState] = useState<boolean>(false);
	const [states, setStates] = useState<boolean[]>();
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		const group = groups.groups.find((x) => x.name === props.group);
		if (group) {
			for (let i = 0; i <= group.ids.length; i++) {
				const deviceID = group.ids[i];
				const deviceData = devices.devices.find((x) => x.id === deviceID);

				if (deviceData) {
					let device = new RGBW2(deviceData!.ipAdress, deviceData!.id);
					setDevices([...lights, device]);
				}
			}
		}
	}, [groups, devices]);

	useEffect(() => {
		const interval = setInterval(() => {
			const lightArray: RGBW2[] = [];
			const stateArray: boolean[] = [];
			const colorArray: color[] = [];
			lights.map((device) => {
				lightArray.push(device);
				stateArray.push(device.state);
				colorArray.push(device.color);

				if (device.state) {
					setState(true);
				}

				if (stateArray.every((state) => state === false)) {
					setState(false);
				}
			});
			setDevices([...lightArray]);
			setStates([...stateArray]);

			if (lights.length === 0) {
				return;
			}
			setColor(lights[0].state ? lights[0].color : lights[0].offColor);
		}, 150);
		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		if (!lights) {
			return;
		}
		Object.keys(lights).map((key) => {
			lights[parseInt(key)].setColor(selectedColor!);
		});
	}, [selectedColor]);

	return (
		<>
			<RGBW2Modal
				open={open}
				devices={lights}
				setOpen={setOpen}
				setSelectedColor={setSelectedColor}
			/>
			<div
				className="h-full w-translate-y-full"
				onClick={async () => {
					if (!lights) {
						return;
					}

					if (state) {
						await Promise.all(
							Object.keys(lights).map(async (key) => {
								const device = lights[parseInt(key)];
								device.turnOff();
							})
						);
						setState(false);
					} else {
						await Promise.all(
							Object.keys(lights).map(async (key) => {
								const device = lights[parseInt(key)];
								device.turnOn();
							})
						);
						setState(true);
					}

					let stateArray: boolean[] = [];
					Object.keys(lights).map((key) => {
						let state = lights[parseInt(key)].state;
						stateArray.push(state);
					});
					setStates({ ...stateArray });
					setColor(state ? color : color);
				}}
			>
				<Card>
					<div
						style={{
							color: color && state ? `rgb(${color.red},${color.green}, ${color.blue})` : '#000',
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
					</div>
				</Card>
			</div>
		</>
	);
};
