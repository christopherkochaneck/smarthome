import { FC } from 'react';
import { ArrowNarrowRight } from 'tabler-icons-react';

interface Props {
	title: string;
	onClick(): void;
}
export const ListTile: FC<Props> = (props) => {
	return (
		<div
			onClick={props.onClick}
			className="flex flex-row place-content-between p-6 items-center text-white hover:cursor-pointer"
		>
			<div>{props.title}</div>
			<div className="ml-auto">
				<ArrowNarrowRight />
			</div>
		</div>
	);
};
