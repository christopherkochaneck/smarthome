import { FC } from 'react';
import { Card } from '../card/card';
import { UsageBar } from './usagebar/usageBar';

interface Props {
	unit: string;
	title: string;
	maxValue: number;
	currentValue: number;
}

export const Usage: FC<Props> = (props) => {
	return (
		<Card className="h-max w-100 grid grid-cols-2 grid-rows-2 p-4 gap-5">
			<div style={{ gridArea: '1/1/2/3' }}>
				<UsageBar currentValue={props.currentValue} maxValue={props.maxValue} />
			</div>
			<div>{props.title}</div>
			<div>{`${props.currentValue} ${props.unit} / ${props.maxValue} ${props.unit}`}</div>
		</Card>
	);
};
