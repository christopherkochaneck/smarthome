import { FC } from 'react';

interface Props {
	children?: React.ReactNode;
	className?: string;
	pointerOnHover?: boolean;
	onClick?: () => void;
}

export const Card: FC<Props> = (props) => {
	return (
		<div
			className={`bg-grey text-center ${
				!props.pointerOnHover && 'hover:cursor-pointer'
			} rounded-xl ${props.className}`}
			onClick={props.onClick}
		>
			{props.children}
		</div>
	);
};
