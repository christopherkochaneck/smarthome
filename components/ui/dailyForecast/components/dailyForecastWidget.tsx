import { FC } from 'react';

interface Props {
	date: string;
	temperature: number;
}

export const DailyForecastWidget: FC<Props> = (props) => {
	const date = new Date(props.date);

	return (
		<>
			<div className="h-full w-full p-4 bg-zinc-700 rounded-xl flex flex-col">
				<div>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}</div>
				<div>{`${props.temperature}°`}</div>
			</div>
		</>
	);
};
