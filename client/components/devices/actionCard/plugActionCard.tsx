import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Plug } from 'tabler-icons-react';
import { useDevices } from '../../../context/DeviceContext';
import { Action } from '../../../types/SceneType';
import { Card } from '../../ui/card/card';
import { ToggleSwitch } from '../../ui/toggleSwitch/toggleSwitch';

interface Props {
	id: string;
	actions: Action[];
	setActions: Dispatch<SetStateAction<Action[]>>;
}
export const PlugActionCard: FC<Props> = (props) => {
	const { devices } = useDevices();
	const [state, setState] = useState<boolean | null>(false);

	useEffect(() => {
		const currentAction = props.actions.find((x) => x._id === props.id);

		if (currentAction === undefined) {
			return;
		}

		setState(currentAction.actions.state);
	}, [devices, props.id, props.actions]);

	useEffect(() => {
		const currentAction = props.actions.find((x) => x._id === props.id);
		if (currentAction === undefined) {
			return;
		}

		if (currentAction.actions.state !== null) {
			currentAction.actions.state = state;
		}

		const index = props.actions.findIndex((x) => x._id === currentAction._id);

		props.actions[index] = currentAction;

		props.setActions([...props.actions]);
	}, [state]);

	return (
		<>
			<Card>
				<div className="flex flex-row items-center p-[10px] gap-x-[10px] content-between">
					<Plug className="h-10 w-10" />
					<div onClick={() => setState(!state)}>
						<ToggleSwitch state={state} setState={setState} className="border border-darkgrey" />
					</div>
				</div>
			</Card>
		</>
	);
};
