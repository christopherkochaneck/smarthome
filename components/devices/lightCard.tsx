import { FC } from 'react';
import LightIcon from '../../res/images/bulb.svg';

export const LightCard: FC = () => {
	return (
		<div className="text-center hover:cursor-pointer h-full w-translate-y-full">
			<div className="text-zinc-700">
				<LightIcon />
			</div>
		</div>
	);
};
