import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Card } from '../../ui/card/card';
import { ToggleSwitch } from '../../ui/toggleSwitch/toggleSwitch';
import { Action } from '../../../types/SceneType';
import { useDevices } from '../../../context/DeviceContext';
import { Plug } from 'tabler-icons-react';

interface Props {
	id: string;
	actions: Action[];
	setActions: Dispatch<SetStateAction<Action[]>>;
}

export const PlugActionCard: FC<Props> = (props) => {
	const { devices } = useDevices();
	const [state, setState] = useState<boolean | null>(false);
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
			<Card className="flex flex-row gap-x-3 p-3 items-center">
				<Plug className="h-10 w-10" />
				<div className="flex flex-row w-full justify-between">
					<div className="text-white text-left">{name}</div>
					<div
						className="self-center"
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
