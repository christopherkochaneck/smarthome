import { FC } from 'react';
import PlugIcon from '../../res/images/plug.svg';

export const PlugCard: FC = () => {
	return (
		<div className="text-center hover:cursor-pointer h-full w-translate-y-full bg-zinc-900 rounded-2xl grid">
			<div className="text-zinc-700 justify-self-center align-middle">
				<PlugIcon />
			</div>
		</div>
	);
};
