import { FC } from 'react';

interface Props {
	className?: string;
	type?: 'submit' | 'reset' | 'button' | undefined;
	children?: React.ReactNode;
	onClick?: () => void;
}

export const FloatingActionButton: FC<Props> = (props) => {
	return (
		<button
			type={props.type}
			className={`${props.className} rounded-full h-max w-max p-3`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};
