import { FC, useEffect, useState } from 'react';
import { useDevices } from '../../../context/DeviceContext';
import { PlugS } from '../../../devices/plugS';
import { RGBW2 } from '../../../devices/rgbw2';
import { HTType } from '../../../types/HTType';
import { PlugSType } from '../../../types/PlugSType';
import { RGBW2Type } from '../../../types/RGBW2Type';

export const PowerUsage: FC = () => {
	const { devices } = useDevices();
	const [power, setPower] = useState<number>(0);

	useEffect(() => {
		if (devices.length === 0) {
			return;
		}
		const entities: any = [];

		devices.forEach((device: RGBW2Type | PlugSType | HTType) => {
			if (device._id === undefined) return;
			switch (device.type) {
				case 'plugs':
					entities.push(new PlugS(device.ipAdress, device._id));
					break;
				case 'rgbw2':
					entities.push(new RGBW2(device.ipAdress, device._id));
					break;
				default:
					break;
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
	}, [devices]);

	return (
		<div className="h-full w-full bg-grey rounded-xl p-4 text-white flex flex-col items-center">
			<div>Current Consumption</div>
			<div>{`${power.toFixed(2)} W`}</div>
		</div>
	);
};
