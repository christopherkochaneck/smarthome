import { FC, useState } from 'react';
import PlugIcon from '../../../res/images/plug.svg';
import { Card } from '../../ui/card/card';
import { ToggleSwitch } from '../../ui/toggleSwitch/toggleSwitch';

interface Props {
	id: string;
	name: string;
}

export const PlugActionCard: FC<Props> = (props) => {
	const [state, setState] = useState<boolean | undefined>(false);

	return (
		<>
			<Card>
				<div className="flex flex-row items-center p-[10px] gap-x-[10px] content-between">
					<PlugIcon />
					<div className="text-white flex-grow">{props.name}</div>
					<div onClick={() => setState(!state)}>
						<ToggleSwitch state={state} setState={setState} className="border border-darkgrey" />
					</div>
				</div>
			</Card>
		</>
	);
};
