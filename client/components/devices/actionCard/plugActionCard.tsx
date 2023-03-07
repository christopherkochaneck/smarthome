import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Card } from '../../ui/card/card';
import { ToggleSwitch } from '../../ui/toggleSwitch/toggleSwitch';
import { Action } from '../../../types/SceneType';
import { useDevices } from '../../../context/DeviceContext';
import { Plug } from 'tabler-icons-react';

interface Props {
	id: string;
	onToggle?: (state: boolean | null) => void;
	state: boolean | null;
}

export const PlugActionCard: FC<Props> = (props) => {
	const { devices } = useDevices();
	const [state, setState] = useState<boolean | null>(false);
	const [name, setName] = useState<string>('');

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
			<Card className="flex flex-row gap-x-3 p-3 items-center">
				<Plug className="h-10 w-10" />
				<div className="flex flex-row w-full justify-between">
					<div className="text-white text-left">{name}</div>
					<div
						className="self-center"
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
