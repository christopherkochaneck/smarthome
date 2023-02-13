import { FC } from 'react';
import Image from 'next/image';

interface Props {
	padding?: number;
	iconSrc?: string;
	icon?: React.ReactNode;
	dimension: number;
	background: string;
}

export const Avatar: FC<Props> = (props) => {
	return (
		<div
			className={`w-max h-max rounded-full`}
			style={{ padding: props.padding, background: props.background }}
		>
			<>
				{props.iconSrc && (
					<Image
						alt="avatar"
						src={props.iconSrc}
						width={props.dimension}
						height={props.dimension}
					/>
				)}
				{props.icon && props.icon}
			</>
		</div>
	);
};
