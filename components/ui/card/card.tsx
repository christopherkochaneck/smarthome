import { FC } from 'react';

interface Props {
	children?: React.ReactNode;
	className?: string;
}

export const Card: FC<Props> = (props) => {
	return (
		<div
			className={`bg-grey text-center hover:cursor-pointer w-full h-full rounded-xl ${props.className}`}
		>
			{props.children}
		</div>
	);
};
