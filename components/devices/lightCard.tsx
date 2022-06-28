import { FC, useEffect, useMemo, useState } from 'react';
import { RGBW2 } from '../../devices/rgbw2';
import color from '../../interfaces/color';
import LightIcon from '../../res/images/bulb.svg';
import { Card } from '../ui/card/card';
import { RGBW2Modal } from '../ui/modals/rgbw2Modal/RGBW2Modal';
import { ToggleSwitch } from '../ui/toggleSwitch/toggleSwitch';
import Hammer from 'react-hammerjs';

interface Props {
	id: string;
	name: string;
	ipAdress: string;
	onLongPress: () => void;
}

type Option = {
	touchAction: string;
	recognizers: { tap: { pointers: number; time: number; threshold: number } };
};

export const LightCard: FC<Props> = (props) => {
	const device = useMemo(() => {
		return new RGBW2(props.ipAdress, props.id);
	}, [props.id, props.ipAdress]);

	const [color, setColor] = useState<color>({ red: 0, green: 0, blue: 0 });
	const [selectedColor, setSelectedColor] = useState<color>({ red: 0, green: 0, blue: 0 });
	const [state, setState] = useState<boolean>(false);
	const [brightness, setBrightness] = useState<number>(100);
	const [name, setName] = useState<string>(props.name);
	const [open, setOpen] = useState<boolean>(false);
	const [options, setOptions] = useState<Option>({
		touchAction: 'compute',
		recognizers: {
			tap: {
				pointers: 1,
				time: 300,
				threshold: 100,
			},
		},
	});

	useEffect(() => {
		const interval = setInterval(async () => {
			await device.fetchCurrentDeviceData();
			setColor(device.color);
			setState(device.state);
			setBrightness(device.brightness);
			setName(props.name);
		}, 150);
		return () => {
			clearInterval(interval);
		};
	}, [device, props.name]);

	useEffect(() => {
		if (device) {
			device.setColor(selectedColor!);
		}
	}, [selectedColor, device]);

	return (
		<>
			<RGBW2Modal
				open={open}
				setOpen={setOpen}
				setSelectedColor={setSelectedColor}
				brightness={brightness}
				setBrightness={setBrightness}
			/>
			<Hammer
				onPress={() => props.onLongPress()}
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
				<div
					className="h-full w-translate-y-full"
					onClick={async () => {
						state ? await device.turnOff() : await device.turnOn();
						setColor(state ? device.color : device.offColor);
						setState(device.state);
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
							<div className="text-zinc-400 text-left">
								{device ? name : 'DeviceTitle unavailable'}
							</div>
							<div
								style={{
									gridArea: '1 / 3 / 3 / 4',
									alignSelf: 'center',
								}}
							>
								<ToggleSwitch state={state} setState={setState} />
							</div>
							<div className="text-zinc-400 text-left">{`Brightness: ${brightness}%`}</div>
						</div>
					</Card>
				</div>
			</Hammer>
		</>
	);
};
