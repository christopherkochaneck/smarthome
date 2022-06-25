import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { RGBW2 } from '../../../devices/rgbw2';
import LightIcon from '../../../res/images/bulb.svg';
import { Card } from '../../ui/card/card';
import { ColorIndicator } from './components/colorIndicator';
import color from '../../../interfaces/color';
import { ToggleSwitch } from '../../ui/toggleSwitch/toggleSwitch';
import { Action } from '../../../types/SceneType';

interface Props {
	id: string;
	name: string;
	color: color;
	setOpen: Dispatch<SetStateAction<boolean>>;
	open: boolean;
	actions: Action[];
	setActions: Dispatch<SetStateAction<Action[]>>;
}

export const LightActionCard: FC<Props> = (props) => {
	const [selected, setSelected] = useState<boolean>(false);
	const [state, setState] = useState<boolean>(false);

	return (
		<>
			<Card>
				<div
					className="grid p-[10px] gap-2 grid-cols-3 grid-rows-2 justify-items-center items-center"
					onClick={() => setSelected(!selected)}
				>
					<div className="co-start-1 row-start-1 row-end-3">
						<LightIcon />
					</div>
					<div className="text-zinc-400 flex-grow col-start-2 row-start-1 row-end-3">
						{props.name}
					</div>
					<div onClick={() => props.setOpen(!props.open)} className="col-start-3">
						<ColorIndicator color={props.color} />
					</div>
					<div
						className="col-start-3"
						onClick={() => {
							setState(!state);
							const action = props.actions.find((x) => x.id == props.id);
							if (action == undefined) {
								return;
							}
							action.actions.state = state;
							props.setActions([action]);
						}}
					>
						<ToggleSwitch state={state} setState={setState} />
					</div>
				</div>
			</Card>
		</>
	);
};
