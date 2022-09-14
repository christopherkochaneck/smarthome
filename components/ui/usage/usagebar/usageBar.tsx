import { FC } from 'react';

interface Props {
	maxValue: number;
	currentValue: number;
}

export const UsageBar: FC<Props> = (props) => {
	let percentage = props.currentValue / props.maxValue;
	return (
		<div className="border border-black h-full w-full bg-zinc-600 rounded-3xl">
			<div
				className={`h-full  bg-zinc-800 rounded-3xl`}
				style={{ width: `${percentage * 100}%` }}
			/>
		</div>
	);
};
