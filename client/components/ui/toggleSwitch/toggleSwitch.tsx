import { Switch } from '@headlessui/react';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
	state: boolean;
	setState: Dispatch<SetStateAction<boolean>>;
	className?: string;
}

export const ToggleSwitch: FC<Props> = (props) => {
	return (
		<Switch
			checked={props.state}
			onChange={() => {
				props.state ? props.setState(!props.state) : props.setState(props.state);
			}}
			className={`${
				props.state ? 'bg-zinc-900' : 'bg-darkgrey'
			} relative inline-flex items-center h-6 rounded-full w-11 ${props.className}`}
		>
			<span
				className={`${
					props.state ? 'translate-x-6' : 'translate-x-1'
				} inline-block w-4 h-4 transform bg-grey rounded-full`}
			/>
		</Switch>
	);
};
