import { FC } from 'react';
import { Card } from '../ui/card/card';

interface Props {
	id?: string;
	name: string;
}
export const SceneCard: FC<Props> = (props) => {
	const handleScene = async () => {};
	return (
		<>
			<div className="h-[179px] w-1/2" onClick={async () => await handleScene}>
				<Card>
					<div className="text-zinc-400">{props.name}</div>
				</Card>
			</div>
		</>
	);
};
