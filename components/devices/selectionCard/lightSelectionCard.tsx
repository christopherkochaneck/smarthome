import { FC, useState } from 'react';
import { RGBW2 } from '../../../devices/rgbw2';
import LightIcon from '../../../res/images/bulb.svg';
import { Card } from '../../ui/card/card';
import { SelectionIndicator } from './components/selectionIndicator';

interface Props {
	id: string;
	name: string;
}

export const LightSelectionCard: FC<Props> = (props) => {
	const [name, setName] = useState<string>(props.name);
	const [selected, setSelected] = useState<boolean>(false);

	return (
		<>
			<Card>
				<div
					className="flex flex-row items-center p-[10px] gap-x-[10px] content-between"
					onClick={() => setSelected(!selected)}
				>
					<LightIcon />
					<div className="text-zinc-400 flex-grow">{props.name}</div>
					<SelectionIndicator selected={selected} setSelected={setSelected} />
				</div>
			</Card>
		</>
	);
};
