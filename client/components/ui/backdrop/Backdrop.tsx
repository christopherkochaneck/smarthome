import React, { CSSProperties, FC } from 'react';

interface Props {
	visible?: boolean;
	onClick?: () => void;
	children?: React.ReactNode;
	className?: string;
	style?: CSSProperties;
}
export const Backdrop: FC<Props> = (props) => {
	return (
		<>
			<div
				onClick={props.onClick}
				className={`fixed inset-0 h-full w-full z-50 ${
					props.className !== undefined && props.className
				}`}
				style={{
					background: 'rgba(0,0,0,0.7)',
				}}
			>
				{props.children}
			</div>
		</>
	);
};
