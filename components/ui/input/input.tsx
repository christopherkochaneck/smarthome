import { FC } from 'react';

interface Props {
	className?: string;
	title: string;
	onChange?: (params: React.FormEvent<HTMLInputElement>) => any;
	value?: string;
}

export const Input: FC<Props> = (props) => {
	return (
		<div className="grid gap-2">
			<div className="text-zinc-700">{props.title}</div>
			<input
				className={`${props.className} bg-zinc-700 p-2`}
				onChange={props.onChange ? props.onChange : undefined}
				value={props.value ? props.value : undefined}
			/>
		</div>
	);
};
