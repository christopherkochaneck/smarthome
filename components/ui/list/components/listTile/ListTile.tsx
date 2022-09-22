import { FC } from 'react';
import ArrowNarrowRight from '../../../../../res/images/arrow-narrow-right.svg';

interface Props {
	title: String;
	onClick(): void;
}
export const ListTile: FC<Props> = (props) => {
	return (
		<div onClick={props.onClick} className="flex flex-row p-2 items-center text-white">
			<div>{props.title}</div>
			<div className="ml-auto">
				<ArrowNarrowRight />
			</div>
		</div>
	);
};
