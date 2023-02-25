import { CSSProperties, FC, HTMLAttributes } from 'react';

type Props = {
	style?: CSSProperties;
	className?: string;
	onClick?: () => void;
};

export const ColorSelector: FC<Props> = (props) => {
	return (
		<div
			className={`rounded-full w-20 h-20 hover:cursor-pointer ${props.className}`}
			style={props.style}
			onClick={(e) => {
				e.stopPropagation();
				props.onClick && props.onClick();
			}}
		/>
	);
};
