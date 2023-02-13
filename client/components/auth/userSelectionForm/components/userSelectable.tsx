import { Dispatch, FC, SetStateAction } from 'react';
import { Avatar } from '../../../ui/avatar/avatar';
import { ArrowNarrowRight, User } from 'tabler-icons-react';

interface Props {
	avatarBackground: string;
	userName: string;
	setSelectedUser: Dispatch<SetStateAction<string>>;
}

export const UserSelectable: FC<Props> = (props) => {
	return (
		<div className="flex flex-col gap-4 w-full">
			<div
				className="flex flex-row items-center gap-4 hover:cursor-pointer place-content-between"
				onClick={() => {
					props.setSelectedUser('123');
				}}
			>
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
			</div>
		</div>
	);
};

export default UserSelectable;
