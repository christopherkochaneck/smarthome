import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { WeatherForeCast } from '../components/weatherForeCast/weatherForeCast';

interface Weather {
	name: string;
	main: { temp_max: string; temp_min: string };
}

interface Props {
	weatherData: Weather;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const res = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?q=Sankt Ingbert&units=metric&APPID=${process.env.OPEN_WEATHER_MAP_API_KEY}`
	);

	const weatherData = res.data;

	return { props: { weatherData } };
};

const Home: NextPage<Props> = ({ weatherData }) => {
	return (
		<LayoutWrapper>
			<div className="text-zinc-400 text-3xl p-10 text-center">
				Hey Chris, here's whats up for today.
			</div>
			<div className="px-10">
				<WeatherForeCast weatherData={weatherData} />
			</div>
		</LayoutWrapper>
	);
};

export default Home;
