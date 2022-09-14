import { FC } from 'react';

interface Props {
	maxValue: number;
	currentValue: number;
}

export const UsageBar: FC<Props> = (props) => {
	let value = props.maxValue / props.currentValue;
	return (
		<div className="border border-black h-full w-full bg-zinc-600 rounded-3xl">
			<div
				className={`h-full  bg-zinc-800 rounded-3xl text-right`}
				style={{ width: `${value}%` }}
			/>
		</div>
	);
};
