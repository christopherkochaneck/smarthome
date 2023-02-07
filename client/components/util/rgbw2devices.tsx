import { FC } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { LightSelectionCard } from '../devices/selectionCard/lightSelectionCard';

type Props = {
	selectedIds: string[];
	function: (key: any) => void;
};

export const Rgbw2Devices: FC<Props> = (props) => {
	const { devices } = useDevices();
	return (
		<>
			{devices
				.filter((x) => x.type === 'rgbw2')
				.map((key: any) => {
					return (
						<div onClick={() => props.function(key)} key={key._id}>
							<LightSelectionCard
								id={key._id}
								key={key._id}
								name={key.title}
								selected={props.selectedIds.includes(key._id)}
							/>
						</div>
					);
				})}
		</>
	);
};
