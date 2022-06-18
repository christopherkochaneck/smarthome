import { FC, useState } from 'react';
import PlugIcon from '../../../res/images/plug.svg';
import { Card } from '../../ui/card/card';
import { SelectionIndicator } from './components/selectionIndicator';

interface Props {
	id: string;
	name: string;
}

export const PlugSelectionCard: FC<Props> = (props) => {
	const [name, setName] = useState<string>(props.name);
	const [selected, setSelected] = useState<boolean>(false);

	return (
		<>
			<Card>
				<div
					className="flex flex-row items-center p-[10px] gap-x-[10px] content-between"
					onClick={() => setSelected(!selected)}
				>
					<PlugIcon />
					<div className="text-zinc-400 flex-grow">{props.name}</div>
					<SelectionIndicator selected={selected} setSelected={setSelected} />
				</div>
			</Card>
		</>
	);
};
