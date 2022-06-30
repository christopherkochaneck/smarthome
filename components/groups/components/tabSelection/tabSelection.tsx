import { FC } from 'react';

interface Props {
	children?: React.ReactNode;
}

export const TabSelection: FC<Props> = (props) => {
	return (
		<>
			<div className="flex flex-row gap-1">{props.children}</div>
		</>
	);
};
