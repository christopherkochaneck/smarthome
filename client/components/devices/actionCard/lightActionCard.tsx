import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Card } from '../../ui/card/card';
import { ColorIndicator } from './components/colorIndicator';
import color from '../../../interfaces/color';
import { ToggleSwitch } from '../../ui/toggleSwitch/toggleSwitch';
import { useDevices } from '../../../context/DeviceContext';
import { Bulb } from 'tabler-icons-react';

interface Props {
	id: string;
	onIndicatorClick: () => void;
	selectedColor: color | null;
	onToggle?: (state: boolean | null) => void;
	state: boolean | null;
}

export const LightActionCard: FC<Props> = (props) => {
	const [state, setState] = useState<boolean | null>(false);
	const [name, setName] = useState<string>('');
	const { devices } = useDevices();

	useEffect(() => {
		const device = devices.find((x) => x._id === props.id);
		if (!device) return;
		setName(device.title);
	}, []);

	useEffect(() => {
		setState(props.state);
	}, [props.state]);

	return (
		<>
			<Card>
				<div className="flex flex-row gap-x-3 p-3 items-center">
					<Bulb className="h-10 w-10" />
					<div className="text-white text-left flex-grow">{name}</div>
					<ColorIndicator color={props.selectedColor} onClick={props.onIndicatorClick} />
					<div
						onClick={() => {
							setState(!state);
							props.onToggle && props.onToggle(!state);
						}}
					>
						<ToggleSwitch state={state} setState={setState} className="border border-darkgrey" />
					</div>
				</div>
			</Card>
		</>
	);
};
