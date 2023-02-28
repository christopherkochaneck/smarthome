import { FC, useEffect, useMemo, useState } from 'react';
import { RGBW2 } from '../../devices/rgbw2';
import Color from '../../interfaces/color';
import { Card } from '../ui/card/card';
import { ToggleSwitch } from '../ui/toggleSwitch/toggleSwitch';
import Hammer from 'react-hammerjs';
import { Bulb } from 'tabler-icons-react';
import { socketClient } from '../../util/socketClient';

interface Props {
	id: string;
	name: string;
	ipAdress: string;
	onLongPress: () => void;
	onIconPress: () => void;
}

export const LightCard: FC<Props> = (props) => {
	const device = useMemo(() => {
		return new RGBW2(props.ipAdress, props.id);
	}, [props.id, props.ipAdress]);

	const [color, setColor] = useState<Color>({ red: 0, green: 0, blue: 0 });
	const [state, setState] = useState<boolean | null>(false);
	const [brightness, setBrightness] = useState<number>(100);
	const [name, setName] = useState<string>(props.name);
	useEffect(() => {
		socketClient.on(props.id, (deviceData) => {
			setColor(deviceData.color);
			setBrightness(deviceData.brightness);
			setState(deviceData.state);
			setName(deviceData.name);
		});
		return () => {
			socketClient.removeListener(props.id);
		};
	}, []);

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
				<div className="h-full w-translate-y-full">
					<Card className="flex flex-row gap-x-3 p-3 items-center">
						<Bulb
							className="h-10 w-10"
							onClick={props.onIconPress}
							style={{
								color: color && state ? `rgb(${color.red},${color.green}, ${color.blue})` : '#000',
							}}
						/>
						<div
							onClick={async () => {
								state ? await device.turnOff() : await device.turnOn();
								setColor(state ? device.color : device.offColor);
								setState(device.state);
							}}
							className="flex flex-row w-full justify-between"
						>
							<div className="flex flex-col">
								<div className="text-white text-left">
									{device ? name : 'DeviceTitle unavailable'}
								</div>
								<div className="text-white text-left">{`Brightness: ${brightness}%`}</div>
							</div>
							<ToggleSwitch
								state={state}
								setState={setState}
								className="border border-darkgrey self-center"
							/>
						</div>
					</Card>
				</div>
			</Hammer>
		</>
	);
};
