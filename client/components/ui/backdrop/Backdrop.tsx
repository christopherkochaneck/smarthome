import React, { FC } from 'react';

interface Props {
	visible: boolean;
	onClick?: () => void;
	children?: React.ReactNode;
}
export const Backdrop: FC<Props> = (props) => {
	return (
		<>
			<div
				onClick={props.onClick}
				className="fixed inset-0 h-full w-full bg-black"
				style={{
					opacity: props.visible ? 0.7 : 0,
					display: props.visible ? 'block' : 'none',
				}}
			>
				{props.children}
			</div>
		</>
	);
};
