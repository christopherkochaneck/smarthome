import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Card } from '../../ui/card/card';
import { ColorIndicator } from './components/colorIndicator';
import color from '../../../interfaces/color';
import { ToggleSwitch } from '../../ui/toggleSwitch/toggleSwitch';
import { Action } from '../../../types/SceneType';
import { RGBW2Modal } from '../../ui/modals/rgbw2Modal/RGBW2Modal';
import { useDevices } from '../../../context/DeviceContext';
import { Bulb } from 'tabler-icons-react';

interface Props {
	id: string;
	actions: Action[];
	setActions: Dispatch<SetStateAction<Action[]>>;
}

export const LightActionCard: FC<Props> = (props) => {
	const { devices } = useDevices();
	const [state, setState] = useState<boolean | null>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [color, setColor] = useState<color | null>(null);
	const [name, setName] = useState<string>('');

	useEffect(() => {
		const currentAction = props.actions.find((x) => x._id === props.id);

		if (currentAction === undefined) {
			return;
		}

		const device = devices.find((x) => x._id === currentAction._id);

		if (device !== undefined) {
			setName(device.title);
		}

		setColor(currentAction.actions.color);
		setState(currentAction.actions.state);
	}, [devices, props.id, props.actions]);

	useEffect(() => {
		const currentAction = props.actions.find((x) => x._id === props.id);
		if (currentAction === undefined) {
			return;
		}

		if (currentAction.actions.color !== null) {
			currentAction.actions.color = color;
		}

		if (currentAction.actions.state !== null) {
			currentAction.actions.state = state;
		}

		const index = props.actions.findIndex((x) => x._id === currentAction._id);

		props.actions[index] = currentAction;

		props.setActions([...props.actions]);
	}, [color, state]);

	return (
		<>
			<RGBW2Modal open={open} setOpen={setOpen} setSelectedColor={setColor} />
			<Card>
				<div className="flex flex-row gap-x-3 p-3 items-center">
					<Bulb className="h-10 w-10" />
					<div className="text-white text-left flex-grow">{name}</div>
					<div onClick={() => setOpen(!open)}>
						<ColorIndicator color={color} />
					</div>
					<div
						onClick={() => {
							setState(!state);
						}}
					>
						<ToggleSwitch state={state} setState={setState} className="border border-darkgrey" />
					</div>
				</div>
			</Card>
		</>
	);
};
