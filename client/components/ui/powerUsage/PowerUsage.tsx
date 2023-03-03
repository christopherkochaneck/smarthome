import { FC, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const PowerUsage: FC = () => {
	const [power, setPower] = useState<number>(0);

	useEffect(() => {
		const socketClient = io('http://localhost:3002/');
		socketClient.on('totalPower', (totalPower) => {
			setPower(totalPower);
		});
		return () => {
			socketClient.removeListener('totalPower');
		};
	}, []);

	return (
		<div className="h-full w-full bg-grey rounded-xl p-4 text-white flex flex-col items-center">
			<div>Current Consumption</div>
			<div>{`${power} W`}</div>
		</div>
	);
};
