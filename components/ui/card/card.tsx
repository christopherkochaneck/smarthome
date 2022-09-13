import { FC } from 'react';

interface Props {
	children?: React.ReactNode;
	className?: string;
}

export const Card: FC<Props> = (props) => {
	return (
		<div
			className={`grid bg-zinc-800 text-center hover:cursor-pointer w-full h-full rounded-xl ${props.className}`}
		>
			{props.children}
		</div>
	);
};
