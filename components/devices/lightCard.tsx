import { FC, useEffect, useState } from 'react';
import { RGBW2 } from '../../devices/rgbw2';
import LightIcon from '../../res/images/bulb.svg';
import { Card } from '../misc/card/card';

interface Props {
	device: RGBW2;
}

interface Color {
	red?: number;
	green?: number;
	blue?: number;
}

export const LightCard: FC<Props> = (props) => {
	const [color, setColor] = useState<Color | undefined>(undefined);
	const [name, setName] = useState('');
	const [state, setState] = useState<Boolean | undefined>(undefined);

	const device = props.device;

	useEffect(() => {
		const interval = setInterval(() => {
			device
				.getState()
				.then((data) => setState(data))
				.catch((error) => console.log(error));

			device
				.getColor()
				.then((data) => setColor(data))
				.catch((error) => console.log(error));
		}, 500);
		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		device.getName().then((data) => setName(data));
	}, []);

	return (
		<div
			className="h-full w-translate-y-full"
			onClick={async () => {
				await device.toggleDevice();
				setState(await device.getState());
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
					<div className="text-gray-700 whitespace-pre-line">{name}</div>
				</div>
			</Card>
		</div>
	);
};
