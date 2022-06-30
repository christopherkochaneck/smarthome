import { FC } from 'react';

interface Props {
	visible: boolean;
	children?: React.ReactNode;
}

export const ContextMenu: FC<Props> = (props) => {
	return (
		<>
			<div
				className="w-full h-max bg-black absolute bottom-0 z-99 rounded-t-3xl flex flex-col gap-3 p-4"
				style={{ display: props.visible ? 'flex' : 'none' }}
			>
				{props.children}
			</div>
		</>
	);
};
