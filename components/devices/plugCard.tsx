import { FC, useEffect, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { PlugS } from '../../devices/plugS';
import PlugIcon from '../../res/images/plug.svg';
import { Card } from '../ui/card/card';
import { ToggleSwitch } from '../ui/toggleSwitch/toggleSwitch';

interface Props {
	id: string;
}

export const PlugCard: FC<Props> = (props) => {
	const devices = useDevices();

	const plug = devices.plugS.find((x) => x.id === props.id);
	const [device, setDevice] = useState<PlugS | undefined>(plug);
	const [state, setState] = useState<boolean>(false);
	const [power, setPower] = useState<number>(0);

	useEffect(() => {
		const d = devices.plugS.find((x) => x.id === props.id);

		if (!d) {
			return;
		}

		setDevice(d);
		setState(d.state);
		setPower(d.power);
	}, [devices.plugS, props.id]);

	return (
		<>
			<div
				className="h-full w-translate-y-full"
				onClick={async () => {
					if (device) {
						await device.toggleDevice();
						const state = device.state;
						setState(state);
					}
				}}
			>
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
							{device ? device.name : 'DeviceTitle unavailable'}
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
		</>
	);
};
