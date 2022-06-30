import { FC, useState } from 'react';
import PlugIcon from '../../../res/images/plug.svg';
import { Card } from '../../ui/card/card';
import { SelectionIndicator } from './components/selectionIndicator';

interface Props {
	id: string;
	name: string;
	selected: boolean;
}

export const PlugSelectionCard: FC<Props> = (props) => {
	return (
		<>
			<Card>
				<div className="flex flex-row items-center p-[10px] gap-x-[10px] content-between">
					<PlugIcon />
					<div className="text-zinc-400 flex-grow">{props.name}</div>
					<SelectionIndicator selected={props.selected} />
				</div>
			</Card>
		</>
	);
};
