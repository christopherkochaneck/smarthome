import { FC } from 'react';
import { Card } from '../../../components/ui/card/card';

interface Props {
	title: string;
	value: string;
}

export const AdminPanelCard: FC<Props> = (props) => {
	return (
		<>
			<Card className="flex flex-col p-4 gap-y-4 text-white">
				<div className="text-white">{props.title}</div>
				<Card className="border border-darkgrey">{props.value}</Card>
			</Card>
		</>
	);
};

export default AdminPanelCard;
