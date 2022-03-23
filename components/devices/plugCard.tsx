import { FC } from 'react';
import PlugIcon from '../../res/images/plug.svg';
import { Card } from '../misc/card/card';

interface Props {
	state: boolean;
}

export const PlugCard: FC<Props> = (props) => {
	const color = props.state ? 'text-white' : 'text-zinc-700';
	return (
		<div className="h-full w-translate-y-full bg-black rounded-2xl grid">
			<Card>
				<div className={`${color} justify-self-center align-middle`}>
					<PlugIcon />
				</div>
			</Card>
		</div>
	);
};
