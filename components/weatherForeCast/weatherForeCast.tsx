import { FC } from 'react';
import { useRouter } from 'next/router';

interface Weather {
	name: string;
	main: { temp: string };
}

interface Props {
	weatherData: Weather;
}

export const WeatherForeCast: FC<Props> = ({ weatherData }) => {
	const router = useRouter();

	return (
		<div
			className="h-max w-full bg-zinc-700 rounded-xl grid text-white text-center gap-y-2 p-5 hover:cursor-pointer"
			onClick={(e) => {
				e.preventDefault();
				router.push('https://www.wetter.com/deutschland/st-ingbert/sankt-ingbert/DE0009233.html');
			}}
		>
			<div className="text-3xl">{weatherData.name}</div>
			<div className="text-2xl">{weatherData.main.temp}°</div>
		</div>
	);
};
