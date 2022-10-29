import { FC } from 'react';
import { DailyForecastData, Forecastday } from '../../../interfaces/dailyForecast';
import { DailyForecastWidget } from './components/dailyForecastWidget';

interface Props {
	dailyForecastData: DailyForecastData;
}

export const DailyForecast: FC<Props> = ({ dailyForecastData }) => {
	if (dailyForecastData.forecast.forecastday == undefined) {
		return <></>;
	}
	return (
		<div className="h-max w-full rounded-xl flex flex-row text-white text-center gap-x-5">
			{dailyForecastData.forecast.forecastday.map((key: Forecastday) => {
				return (
					<div key={key.date}>
						<DailyForecastWidget date={key.date} temperature={key.day.maxtemp_c} />
					</div>
				);
			})}
		</div>
	);
};
