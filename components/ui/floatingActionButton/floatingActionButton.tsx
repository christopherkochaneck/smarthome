import { FC } from 'react';

interface Props {
	className?: string;
	onClick: (params: any) => any;
}

export const FloatingActionButton: FC<Props> = (props) => {
	return (
		<div onClick={props.onClick} className={`${props.className} rounded-full h-max w-max p-3`}>
			{props.children}
		</div>
	);
};
