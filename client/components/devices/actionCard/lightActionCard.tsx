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
	const [action, setAction] = useState<Action>();
	const [color, setColor] = useState<color | null>(null);
	const [name, setName] = useState<string>('');

	useEffect(() => {
		const currentAction = props.actions.find((x) => x.id === props.id);

		if (currentAction === undefined) {
			return;
		}

		const device = devices.find((x) => x.id === currentAction.id);

		if (device !== undefined) {
			setName(device.title);
		}

		setColor(currentAction.actions.color);
		setState(currentAction.actions.state);
	}, [devices, props.id]);

	useEffect(() => {
		const currentAction = props.actions.find((x) => x.id === props.id);
		if (currentAction === undefined) {
			return;
		}

		if (currentAction.actions.color !== null) {
			currentAction.actions.color = color;
		}

		if (currentAction.actions.state !== null) {
			currentAction.actions.state = state;
		}
		setAction(currentAction);

		const index = props.actions.findIndex((x) => x.id === currentAction.id);

		props.actions[index] = currentAction;

		props.setActions([...props.actions]);
	}, [color, state]);

	return (
		<>
			<RGBW2Modal open={open} setOpen={setOpen} setSelectedColor={setColor} />
			<Card>
				<div className="grid p-[10px] gap-2 grid-cols-3 grid-rows-2 justify-items-center items-center">
					<div className="co-start-1 row-start-1 row-end-3">
						<Bulb className="h-10 w-10" />
					</div>
					<div className="text-white flex-grow col-start-2 row-start-1 row-end-3">{name}</div>
					<div onClick={() => setOpen(!open)} className="col-start-3">
						<ColorIndicator color={color} />
					</div>
					<div
						className="col-start-3"
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
