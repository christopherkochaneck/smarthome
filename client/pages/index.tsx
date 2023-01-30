import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import { DailyForecast } from '../components/ui/dailyForecast/dailyForecast';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { WeatherForeCast } from '../components/ui/weatherForeCast/weatherForeCast';
import { WeatherData } from '../interfaces/weather';
import { DailyForecastData } from '../interfaces/dailyForecast';
import { PowerUsage } from '../components/ui/powerUsage/PowerUsage';
import { ClimateData } from '../components/ui/climateData/ClimateData';

interface Props {
	weatherData: WeatherData;
	dailyForecastData: DailyForecastData;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const weatherData = await getWeatherData();
	const dailyForecastData = await getDailyForecast();

	return { props: { weatherData, dailyForecastData } };
};

const Home: NextPage<Props> = ({ weatherData, dailyForecastData }) => {
	return (
		<>
			<LayoutWrapper showAppbarIcon>
				<div className="flex flex-col gap-10">
					<div className="p-5 text-white text-3xl text-center">
						Hey Chris, here&apos;s whats up for today.
					</div>
					<div className="p-5">
						<WeatherForeCast weatherData={weatherData} />
					</div>
					<div className="mx-auto">
						<div className="text-white text-xl text-center pb-5">Forecast for the next 3 Days</div>
						<DailyForecast dailyForecastData={dailyForecastData} />
					</div>
					<div className="mx-auto">
						<ClimateData />
					</div>
					<div className="mx-auto">
						<PowerUsage />
					</div>
				</div>
			</LayoutWrapper>
		</>
	);
};

export default Home;

async function getWeatherData(): Promise<WeatherData> {
	try {
		const res = await axios.get(
			`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=Sankt%20Ingbert&aqi=no`
		);

		return res.data;
	} catch (error) {
		return { location: { name: 'N/A' }, current: { temp_c: 0 } };
	}
}

async function getDailyForecast(): Promise<DailyForecastData> {
	try {
		const res = await axios.get(
			`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=Sankt Ingbert&days=5&aqi=no&alerts=no`
		);

		return res.data;
	} catch (err) {
		return Promise.reject();
	}
}
