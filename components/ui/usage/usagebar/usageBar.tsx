import { FC } from 'react';

interface Props {
	maxValue: number;
	currentValue: number;
}

export const UsageBar: FC<Props> = (props) => {
	let percentage = props.currentValue / props.maxValue;
	return (
		<div className="border border-darkgrey h-full w-full bg-grey rounded-3xl">
			<div
				className={`h-full  bg-darkgrey rounded-3xl`}
				style={{ width: `${percentage * 100}%` }}
			/>
		</div>
	);
};
