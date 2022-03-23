import { FC, useEffect, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { RGBW2 } from '../../devices/rgbw2';
import color from '../../interfaces/color';
import LightIcon from '../../res/images/bulb.svg';
import { Card } from '../misc/card/card';
import { RGBW2Modal } from '../ui/modals/rgbw2Modal/RGBW2Modal';
import { ToggleSwitch } from '../ui/toggleSwitch/toggleSwitch';

interface Props {
	deviceKey: string;
}

export const LightCard: FC<Props> = (props) => {
	const [color, setColor] = useState<color>({ red: 0, green: 0, blue: 0 });
	const [device, setDevice] = useState<RGBW2 | undefined>();
	const [state, setState] = useState<boolean | undefined>();
	const [open, setOpen] = useState<boolean>(false);
	const devices = useDevices();

	useEffect(() => {
		const d = devices.shellies[props.deviceKey];
		setDevice(d);
		const s = d.state;
		setColor(s ? d.color : d.offColor);
		setState(s);
	}, [devices.shellies, props.deviceKey]);

	if (!device) {
		return null;
	}

	return (
		<>
			<RGBW2Modal open={open} device={device} />
			<div
				className="h-full w-translate-y-full"
				onClick={async () => {
					setOpen(!open);
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
						<div style={{ gridArea: '1 / 1 / 3 / 2' }}>
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
							<ToggleSwitch checked={state} />
						</div>
						<div className="text-zinc-400 text-left">{`Brightness: ${device.brightness}%`}</div>
					</div>
				</Card>
			</div>
		</>
	);
};
