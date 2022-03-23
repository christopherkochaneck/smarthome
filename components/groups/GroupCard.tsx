import { FC } from 'react';
import { RGBW2 } from '../../devices/rgbw2';
import { Card } from '../misc/card/card';

interface Props {
	devices?: {
		shellies?: RGBW2[];
		plugs?: any[];
		WOL?: any[];
	};
}
export const GroupCard: FC<Props> = (props) => {
	return (
		<div className="w-full h-full">
			<Card>
				<div>Lights</div>
			</Card>
		</div>
	);
};
