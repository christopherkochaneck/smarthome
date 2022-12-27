import { FC } from 'react';
import { Droplet, Temperature } from 'tabler-icons-react';

interface Props {
	humidity: number;
	temperature: number;
}

export const ClimateData: FC<Props> = ({ temperature, humidity }) => {
	return (
		<div className="h-full w-full bg-grey rounded-xl p-4 text-white flex flex-col gap-2 items-center justify-center">
			<div>Room Climate</div>
			<span className="flex gap-4">
				<span className="flex">
					<Temperature />
					{`${16}°C`}
				</span>
				<span className="flex">
					<Droplet />
					{`${50}%`}
				</span>
			</span>
		</div>
	);
};
