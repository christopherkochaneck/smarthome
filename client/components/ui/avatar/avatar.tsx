import { FC } from 'react';
import Image from 'next/image';

interface Props {
	avatarUrl: string;
	dimension: number;
}
export const Avatar: FC<Props> = (props) => {
	return (
		<div className="w-max h-max">
			<Image
				alt="avatar"
				src={props.avatarUrl}
				width={props.dimension}
				height={props.dimension}
				className="rounded-full"
			/>
		</div>
	);
};
