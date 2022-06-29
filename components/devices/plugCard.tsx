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

	const [state, setState] = useState<boolean>(false);
	const [power, setPower] = useState<number>(0);
	const [name, setName] = useState<string>(props.name);

	useEffect(() => {
		const interval = setInterval(async () => {
			await device.fetchCurrentDeviceData();
			setState(device.state);
			setPower(device.power);
			setName(props.name);
		}, 150);
		return () => {
			clearInterval(interval);
		};
	}, [device, props.name]);

	return (
		<>
			<Hammer
				onPress={props.onLongPress}
				onTap={async () => {
					state ? await device.turnOff() : await device.turnOn();
					setState(device.state);
				}}
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
					<Card>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'max-content 1fr max-content',
								gridTemplateRows: 'repeat(2, max-content)',
								columnGap: '10px',
								padding: '10px',
							}}
						>
							<div
								style={{
									gridArea: '1 / 1 / 3 / 2',
									color: state ? 'white' : 'black',
								}}
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
								<PlugIcon />
							</div>
							<div className="text-zinc-400 text-left">
								{name ? name : 'DeviceTitle unavailable'}
							</div>
							<div
								style={{
									gridArea: '1 / 3 / 3 / 4',
									alignSelf: 'center',
								}}
							>
								<ToggleSwitch state={state} setState={setState} />
							</div>
							<div className="text-zinc-400 text-left">{`Load: ${power} W`}</div>
						</div>
					</Card>
				</div>
			</Hammer>
		</>
	);
};
