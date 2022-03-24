import { Switch } from '@headlessui/react';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

interface Props {
	state: boolean;
	setState: Dispatch<SetStateAction<boolean>>;
}

export const ToggleSwitch: FC<Props> = (props) => {
	useEffect(() => {
		props.setState(props.state);
	}, [props.state]);

	return (
		<div onClick={(e) => e.stopPropagation()}>
			<Switch
				checked={props.state}
				onChange={() => {
					props.state ? props.setState(!props.state) : props.setState(props.state);
				}}
				className={`${
					props.state ? 'bg-zinc-900' : 'bg-zinc-700'
				} relative inline-flex items-center h-6 rounded-full w-11`}
			>
				<span
					className={`${
						props.state ? 'translate-x-6' : 'translate-x-1'
					} inline-block w-4 h-4 transform bg-zinc-500 rounded-full`}
				/>
			</Switch>
		</div>
	);
};
