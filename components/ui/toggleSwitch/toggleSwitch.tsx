import { Switch } from '@headlessui/react';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

interface Props {
	state: boolean | undefined;
	setState: Dispatch<SetStateAction<boolean | undefined>>;
	className?: string;
}

export const ToggleSwitch: FC<Props> = (props) => {
	const [checked, setChecked] = useState<boolean>(false);
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
