import { FC } from 'react';

interface Props {
	className?: string;
	title: string;
}

export const Input: FC<Props> = (props) => {
	return (
		<div className="grid gap-2">
			<div className="text-zinc-700">{props.title}</div>
			<input className={`${props.className} bg-zinc-700 w-full h-full`} />
		</div>
	);
};
