import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { RGBW2 } from '../../../devices/rgbw2';
import LightIcon from '../../../res/images/bulb.svg';
import { Card } from '../../ui/card/card';
import { ColorIndicator } from './components/colorIndicator';
import color from '../../../interfaces/color';
import { ToggleSwitch } from '../../ui/toggleSwitch/toggleSwitch';
import { Action } from '../../../types/SceneType';
import { RGBW2Modal } from '../../ui/modals/rgbw2Modal/RGBW2Modal';
import { v4 as uuidv4 } from 'uuid';

interface Props {
	id: string;
	name: string;
	actions: Action[];
	setActions: Dispatch<SetStateAction<Action[]>>;
}

export const LightActionCard: FC<Props> = (props) => {
	const [state, setState] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [color, setSelectedColor] = useState<color>({ red: 0, green: 0, blue: 0 });
	const [action, setAction] = useState<Action>({
		id: uuidv4(),
		type: 'rgbw2',
		actions: { color: { red: 0, green: 0, blue: 0 }, state: false },
	});

	useEffect(() => {
		if (action == undefined) {
			return;
		}

		setAction({ id: action.id, type: 'rgbw2', actions: { color: color, state: state } });

		const currentAction = props.actions.find((x) => x.id == action.id);
		if (currentAction == undefined) {
			props.setActions([...props.actions, action]);
			return;
		}
	}, [color, state, props, action]);

	return (
		<>
			<RGBW2Modal open={open} setOpen={setOpen} setSelectedColor={setSelectedColor} />
			<Card>
				<div className="grid p-[10px] gap-2 grid-cols-3 grid-rows-2 justify-items-center items-center">
					<div className="co-start-1 row-start-1 row-end-3">
						<LightIcon />
					</div>
					<div className="text-zinc-400 flex-grow col-start-2 row-start-1 row-end-3">
						{props.name}
					</div>
					<div onClick={() => setOpen(!open)} className="col-start-3">
						<ColorIndicator color={color} />
					</div>
					<div
						className="col-start-3"
						onClick={() => {
							setState(!state);
						}}
					>
						<ToggleSwitch state={state} setState={setState} />
					</div>
				</div>
			</Card>
		</>
	);
};
