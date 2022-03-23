import { FC, useEffect, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { RGBW2 } from '../../devices/rgbw2';
import color from '../../interfaces/color';
import LightIcon from '../../res/images/bulb.svg';
import { Card } from '../misc/card/card';

interface Props {
	deviceKey: string;
}

export const LightCard: FC<Props> = (props) => {
	const [color, setColor] = useState<color>({ red: 0, green: 0, blue: 0 });
	const [device, setDevice] = useState<RGBW2 | undefined>();
	const [state, setState] = useState<boolean | undefined>();
	const devices = useDevices();

	useEffect(() => {
		const d = devices.shellies[props.deviceKey];
		setDevice(d);
		setColor(d.color);
	}, [devices.shellies, props.deviceKey]);

	useEffect(() => {
		devices.addListener(props.deviceKey);
		return () => {
			devices.removeListener(props.deviceKey);
		};
	}, []);

	if (!device) {
		return null;
	}

	return (
		<div
			className="h-full w-translate-y-full"
			onClick={async () => {
				// const state = await device.state;
				// device.toggleDevice();
				setColor({ red: 0, green: 255, blue: 0 });
				setState(state);
			}}
		>
			<Card>
				<div
					style={{
						color: color && state ? `rgb(${color.red},${color.green}, ${color.blue})` : '#000',
						padding: '30px',
						display: 'grid',
						gap: '10px',
					}}
				>
					<div className="justify-self-center">
						<LightIcon />
					</div>
					<div className="text-gray-700 whitespace-pre-line">{device.name}</div>
				</div>
			</Card>
		</div>
	);
};
