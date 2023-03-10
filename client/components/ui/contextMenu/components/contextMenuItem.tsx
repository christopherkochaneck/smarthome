import { FC } from 'react';

interface Props {
	title: string;
	type: 'cancel' | 'contextItem';
	onClick: () => void;
}

export const ContextMenuItem: FC<Props> = (props) => {
	const getType = () => {
		if (props.type === 'cancel') {
			return 'red';
		} else {
			return 'white';
		}
	};

	return (
		<>
			<div
				className="w-full h-max text-center p-4 bg-zinc-800 rounded-xl hover:cursor-pointer"
				style={{ color: getType() }}
				onClick={props.onClick}
			>
				{props.title}
			</div>
		</>
	);
};
