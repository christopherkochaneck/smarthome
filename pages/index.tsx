import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { LayoutWrapper } from '../components/layout/layoutWrapper';
import { WeatherForeCast } from '../components/weatherForeCast/weatherForeCast';
import { SignIn } from '../components/auth/signIn';

interface Weather {
	name: string;
	main: { temp: string };
}

interface Props {
	weatherData: Weather;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const weatherData = await getWeatherData();

	return { props: { weatherData } };
};

const Home: NextPage<Props> = ({ weatherData }) => {
	// const { data: session } = useSession(undefined);

	return (
		<>
			<LayoutWrapper showAppbar={false} showAppbarIcon={true}>
				<div className="text-zinc-400 text-3xl p-10 text-center">
					Hey Chris, here&apos;s whats up for today.
				</div>
				<div className="px-10">
					<WeatherForeCast weatherData={weatherData} />
				</div>
			</LayoutWrapper>
		</>
	);
};

export default Home;

async function getWeatherData(): Promise<Weather> {
	try {
		const res = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=Sankt Ingbert&units=metric&APPID=${process.env.OPEN_WEATHER_MAP_API_KEY}`
		);

		const weatherData = res.data;

		return weatherData;
	} catch (error) {
		console.error(error);
		return { name: 'No Data available.', main: { temp: 'N/A' } };
	}
}
