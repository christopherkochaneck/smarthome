import { FC } from 'react';

interface Props {
	className?: string;
	title: string;
	onChange?: (params: React.FormEvent<HTMLInputElement>) => any;
	value?: string;
	pattern?: string;
}

export const Input: FC<Props> = (props) => {
	return (
		<div className="grid gap-2">
			<div className="text-white">{props.title}</div>
			<input
				className={`${props.className} bg-grey text-white p-2`}
				onChange={props.onChange}
				value={props.value || undefined}
				pattern={props.pattern}
			/>
		</div>
	);
};
