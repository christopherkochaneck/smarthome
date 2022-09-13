import { FC } from 'react';

interface Props {
	children?: React.ReactNode;
}
export const List: FC<Props> = (props) => {
	return <div>{props.children}</div>;
};
