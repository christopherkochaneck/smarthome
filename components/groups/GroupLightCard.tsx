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
	groupID: string;
	groupName: string;
	title: string;
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
	const [name, setName] = useState<string>('');

	useEffect(() => {
		const group = groups.groups.find((x) => x.id == props.groupID);

		if (group == undefined) {
			return;
		}

		group.ids.map((id) => {
			const res = devices.devices.find((x) => x.id == id);

			if (res == undefined) {
				return;
			}

			const device = new RGBW2(res.ipAdress, res.id);
			setLights([...lights, device]);
		});
	}, [groups, devices, props.groupID]);

	useEffect(() => {
		const interval = setInterval(async () => {
			await Promise.all(
				lights.map((device: RGBW2) => {
					return device.fetchCurrentDeviceData();
				})
			);

			if (lights.every((device) => device.state == false)) {
				setState(false);
			}

			if (lights.some((device) => device.state) == true) {
				setState(true);
			}
		}, 150);
		return () => {
			clearInterval(interval);
		};
	}, [lights]);

	useEffect(() => {
		if (!lights) {
			return;
		}
		lights.map((device: RGBW2) => {
			device.setColor(selectedColor!);
		});
	}, [selectedColor]);

	return (
		<>
			<RGBW2Modal open={open} setOpen={setOpen} setSelectedColor={setSelectedColor} />
			<div
				className="h-full w-translate-y-full"
				onClick={async () => {
					if (!lights) {
						return;
					}

					if (state) {
						await Promise.all(
							lights.map(async (device: RGBW2) => {
								await device.turnOff();
							})
						);
						setState(false);
					} else {
						await Promise.all(
							lights.map(async (device: RGBW2) => {
								await device.turnOn();
							})
						);
						setState(true);
					}

					let stateArray: boolean[] = [];
					lights.map((device: RGBW2) => {
						stateArray.push(device.state);
					});
					setStates([...stateArray]);
					setColor(state ? color : color);
				}}
			>
				<Card>
					<div
						style={{
							color: 'white',
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
		</>
	);
};
