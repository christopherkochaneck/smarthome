import { FC } from 'react';
import { Navbar } from './navbar';

interface Props {
	actions?: JSX.Element;
	fab?: JSX.Element;
}

export const LayoutWrapper: FC<Props> = (props) => {
	return (
		<div>
			<Navbar actions={props.actions} />
			<div className="content">{props.children}</div>
			{props.fab}
		</div>
	);
};
