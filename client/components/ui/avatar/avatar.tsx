import { FC } from 'react';
import Image from 'next/image';

interface Props {
	padding?: number;
	icon?: React.ReactNode | string;
	dimension: number;
	background: string;
}

export const Avatar: FC<Props> = (props) => {
	return (
		<div
			className={`w-max h-max rounded-full relative`}
			style={{ padding: props.padding, background: props.background }}
		>
			<>
				{typeof props.icon === 'string' ? (
					<Image alt="avatar" src={props.icon} width={props.dimension} height={props.dimension} />
				) : (
					props.icon
				)}
			</>
		</div>
	);
};
