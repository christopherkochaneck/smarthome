import { FC } from 'react';
import { useDevices } from '../../context/DeviceContext';
import { PlugSelectionCard } from '../devices/selectionCard/PlugSelectionCard';

type Props = {
	selectedIds: string[];
	function: (key: any) => void;
};

export const PlugSDevices: FC<Props> = (props) => {
	const { devices } = useDevices();
	return (
		<>
			{devices
				.filter((x) => x.type === 'plugs')
				.map((key: any) => {
					return (
						<div onClick={() => props.function(key)} key={key._id}>
							<PlugSelectionCard
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
