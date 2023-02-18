import { FC } from 'react';
import { Avatar } from '../../../ui/avatar/avatar';
import { ArrowNarrowRight, User } from 'tabler-icons-react';

interface Props {
	_id: string;
	avatarBackground: string;
	userName: string;
	onClick: () => void;
}

export const UserSelectable: FC<Props> = (props) => {
	return (
		<div className="flex flex-col gap-4 w-full" onClick={props.onClick}>
			<button className="flex flex-row items-center gap-4 hover:cursor-pointer place-content-between">
				<span className="flex items-center justify-center gap-4">
					<Avatar
						padding={8}
						dimension={32}
						background={props.avatarBackground}
						icon={<User className="h-8 w-8 text-white" />}
					/>
					<span className="text-white">{props.userName}</span>
				</span>
				<ArrowNarrowRight className="w-8 h-8 text-white" />
			</button>
		</div>
	);
};

export default UserSelectable;
