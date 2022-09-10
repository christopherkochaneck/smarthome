import { FC, useEffect, useMemo, useState } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { PlugS } from '../../devices/plugS';
import { RGBW2 } from '../../devices/rgbw2';
import { PlugSType } from '../../types/PlugSType';
import { RGBW2Type } from '../../types/RGBW2Type';

export const PowerUsage: FC = () => {
	const devices = useDevices();
	const [entities, setEntities] = useState<any[]>([]);
	const [power, setPower] = useState<number>(0);
	useEffect(() => {
		console.log('here');
		devices.devices.forEach((device: RGBW2Type | PlugSType) => {
			if (device.type === 'plugS') {
				entities.push(new PlugS(device.ipAdress, device.id));
			}
			if (device.type === 'rgbw2') {
				entities.push(new RGBW2(device.ipAdress, device.id));
			}
		});

		const interval = setInterval(() => {
			setPower(0);
			entities.forEach((device: RGBW2 | PlugS) => {
				device.fetchCurrentDeviceData();
				setPower((prev) => prev + device.power);
			});
		}, 400);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="h-full w-full bg-zinc-700 rounded-xl p-4 text-white flex flex-col">
			<div>Current Load</div>
			<div>{`${power.toFixed(2)} W`}</div>
		</div>
	);
};
