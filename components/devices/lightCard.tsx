import { FC, useEffect, useState } from 'react';
import { RGBW2 } from '../../devices/rgbw2';
import LightIcon from '../../res/images/bulb.svg';
import { Card } from '../misc/card/card';

interface Props {
	ipAddress: string;
}

interface Color {
	red?: number;
	green?: number;
	blue?: number;
}

async function getColor(device: RGBW2) {
	const color = await device.getColor();
	return color;
}

async function getName(device: RGBW2) {
	const name = await device.getName();
	return name;
}

async function toggleDevice(device: RGBW2) {
	await device.toggleDevice();
}

async function getState(device: RGBW2) {
	const state = await device.getState();
	return state;
}

export const LightCard: FC<Props> = (props) => {
	const [color, setColor] = useState<Color | undefined>({ red: 0, blue: 0, green: 0 });
	const [name, setName] = useState('');
	const [state, setState] = useState<Boolean | undefined>();

	const device = new RGBW2(props.ipAddress);

	useEffect(() => {
		(async () => {
			const [color, name, state] = await Promise.all([
				await getColor(device),
				await getName(device),
				await getState(device),
			]);
			setName(name ? name : '');
			setState(state);
		})();
	}, []);

	useEffect(() => {
		if (state) {
			(async () => {
				try {
					const reponse = await device.getColor();
					setColor(await { red: reponse?.red, green: reponse?.green, blue: reponse?.blue });
				} catch (error) {
					console.log(error);
				}
			})();
		} else {
			setColor({ red: 0, green: 0, blue: 0 });
		}
	}, [state]);

	return (
		<div
			className="h-full w-translate-y-full"
			onClick={async () => {
				await toggleDevice(device);
				setState(await device.getState());
			}}
		>
			<Card>
				<div
					style={{
						color: `rgb(${color?.red},${color?.green}, ${color?.blue})`,
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
