import { FC, useEffect, useMemo, useState } from 'react';
import { PlugS } from '../../devices/plugS';
import { Card } from '../ui/card/card';
import { ToggleSwitch } from '../ui/toggleSwitch/toggleSwitch';
import Hammer from 'react-hammerjs';
import { Plug } from 'tabler-icons-react';
import { io } from 'socket.io-client';

interface Props {
	id: string;
	name: string;
	ipAdress: string;
	onLongPress: () => void;
	disableOnLoad?: boolean;
}

export const PlugCard: FC<Props> = (props) => {
	const device = useMemo(() => {
		return new PlugS(props.ipAdress, props.id);
	}, [props.id, props.ipAdress]);

	const [state, setState] = useState<boolean | null>(false);
	const [power, setPower] = useState<number>(0);

	useEffect(() => {
		const socketClient = io('http://localhost:3002/', { query: { id: props.id } });
		socketClient.on(props.id, (deviceData: any) => {
			setState(deviceData.state);
			setPower(deviceData.power);
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
					<Card className="flex flex-row gap-x-3 p-3 items-center" pointerOnHover={power > 2}>
						<div
							style={{
								color: state ? 'white' : 'black',
							}}
						>
							<Plug className="h-10 w-10" />
						</div>
						<div
							onClick={async () => {
								if (power < 2) {
									state ? await device.turnOff() : await device.turnOn();
									setState(device.state);
								}
							}}
							className="flex flex-row w-full justify-between"
						>
							<div className="flex flex-col">
								<div className="text-white text-left">
									{device ? props.name : 'DeviceTitle unavailable'}
								</div>
								<div className="text-white text-left">{`Load: ${power} W`}</div>
							</div>
							{power < 2 && (
								<div className="self-center">
									<ToggleSwitch
										state={state}
										setState={setState}
										className="border border-darkgrey"
									/>
								</div>
							)}
						</div>
					</Card>
				</div>
			</Hammer>
		</>
	);
};
