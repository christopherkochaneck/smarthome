import { FC, useEffect, useMemo, useState } from 'react';
import { PlugS } from '../../devices/plugS';
import PlugIcon from '../../res/images/plug.svg';
import { Card } from '../ui/card/card';
import { ToggleSwitch } from '../ui/toggleSwitch/toggleSwitch';
import Hammer from 'react-hammerjs';

interface Props {
	id: string;
	name: string;
	ipAdress: string;
	onLongPress: () => void;
}

export const PlugCard: FC<Props> = (props) => {
	const device = useMemo(() => {
		return new PlugS(props.ipAdress, props.id);
	}, [props.id, props.ipAdress]);

	const [state, setState] = useState<boolean | undefined>(undefined);
	const [power, setPower] = useState<number>(0);
	const [name, setName] = useState<string>(props.name);

	useEffect(() => {
		const interval = setInterval(async () => {
			await device.fetchCurrentDeviceData();
			setState(device.state);
			setPower(device.power);
			setName(props.name);
		}, 400);
		return () => {
			clearInterval(interval);
		};
	}, [device, props.name]);

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
					<Card className="flex flex-row gap-x-3 p-3">
						<div
							style={{
								color: state ? 'white' : 'black',
							}}
						>
							<PlugIcon />
						</div>
						<div
							onClick={async () => {
								state ? await device.turnOff() : await device.turnOn();
								setState(device.state);
							}}
							className='flex flex-col w-full justify-between"'
						>
							<div className="text-white text-left">
								{device ? name : 'DeviceTitle unavailable'}
							</div>
							<div className="text-white text-left">{`Load: ${power} W`}</div>
						</div>
						<div className="self-center">
							<ToggleSwitch state={state} setState={setState} className="border border-black" />
						</div>
					</Card>
				</div>
			</Hammer>
		</>
	);
};
