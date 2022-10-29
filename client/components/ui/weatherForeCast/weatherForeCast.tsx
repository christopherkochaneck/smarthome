import { FC } from 'react';
import { useRouter } from 'next/router';
import { WeatherData } from '../../../interfaces/weather';

interface Props {
	weatherData: WeatherData;
}

export const WeatherForeCast: FC<Props> = ({ weatherData }) => {
	const router = useRouter();

	return (
		<div
			className="h-max w-full bg-grey rounded-xl grid text-white text-center gap-y-2 p-5 hover:cursor-pointer"
			onClick={(e) => {
				e.preventDefault();
				router.push('https://www.wetter.com/deutschland/st-ingbert/sankt-ingbert/DE0009233.html');
			}}
		>
			<div className="text-3xl">{weatherData.location.name}</div>
			<div className="text-2xl">{weatherData.current.temp_c}°</div>
		</div>
	);
};
