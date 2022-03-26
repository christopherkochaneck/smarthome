import { FC, useEffect, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { RGBW2 } from '../../devices/rgbw2';
import color from '../../interfaces/color';
import LightIcon from '../../res/images/bulb.svg';
import { Card } from '../ui/card/card';
import { RGBW2Modal } from '../ui/modals/rgbw2Modal/RGBW2Modal';
import { ToggleSwitch } from '../ui/toggleSwitch/toggleSwitch';

interface Props {
	deviceKey: string;
}

export const LightCard: FC<Props> = (props) => {
	const devices = useDevices();
	const [color, setColor] = useState<color>({ red: 0, green: 0, blue: 0 });
	const [device, setDevice] = useState<RGBW2>(devices.rgbw2[props.deviceKey]);
	const [selectedColor, setSelectedColor] = useState<color | undefined>(undefined);
	const [state, setState] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [brightness, setBrightness] = useState<number>(100);
	const [fade, setFade] = useState<boolean>(false);

	useEffect(() => {
		const d = devices.rgbw2[props.deviceKey];
		setDevice(d);
		const s = d.state;
		setColor(s ? d.color : d.offColor);
		setState(s);
		setBrightness(d.brightness);
	}, [devices.rgbw2, props.deviceKey]);

	useEffect(() => {
		device.setColor(selectedColor!);
	}, [selectedColor]);

	useEffect(() => {
		if (open) {
			const interval = setInterval(async () => {
				await device.setColor({
					red: Math.random() * 100,
					green: Math.random() * 100,
					blue: Math.random() * 100,
				});
			}, 3000);
			return () => {
				clearInterval(interval);
			};
		}
	}, [fade]);

	return (
		<>
			<RGBW2Modal
				open={open}
				device={device}
				setOpen={setOpen}
				setSelectedColor={setSelectedColor}
				brightness={brightness}
				setBrightness={setBrightness}
				fade={fade}
				setFade={setFade}
			/>
			<div
				className="h-full w-translate-y-full"
				onClick={async () => {
					await device.toggleDevice();
					const state = device.state;
					setColor(state ? device.color : device.offColor);
					setState(state);
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
							{device.name ? device.name : 'DeviceTitle unavailable'}
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
		</>
	);
};
