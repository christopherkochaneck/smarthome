import { FC } from 'react';
import { Avatar } from '../../../ui/avatar/avatar';
import { User } from 'tabler-icons-react';
import { Card } from '../../../ui/card/card';

interface Props {
	_id: string;
	avatarBackground: string;
	userName: string;
	actions?: React.ReactNode[];
	onClick?: () => void;
}

export const UserSelectable: FC<Props> = (props) => {
	return (
		<Card
			className="flex flex-row items-center content-between gap-4 w-full p-3"
			onClick={props.onClick}
		>
			<span className="flex-grow">
				<span className="flex placeholder:items-center items-center gap-4">
					<Avatar
						padding={8}
						dimension={32}
						background={props.avatarBackground}
						icon={<User className="h-8 w-8 text-white" />}
					/>
					<span className="text-white">{props.userName}</span>
				</span>
			</span>
			<span className="flex gap-2">{props.actions}</span>
		</Card>
	);
};

export default UserSelectable;
