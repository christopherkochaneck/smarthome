import { FC } from 'react';
import { Plug } from 'tabler-icons-react';
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
					<Plug className="h-10 w-10" />
					<div className="text-white flex-grow">{props.name}</div>
					<SelectionIndicator selected={props.selected} />
				</div>
			</Card>
		</>
	);
};
