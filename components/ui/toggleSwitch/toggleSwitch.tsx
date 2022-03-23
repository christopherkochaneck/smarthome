import { Switch } from '@headlessui/react';
import { FC, useEffect, useState } from 'react';

interface Props {
	checked?: boolean;
}

export const ToggleSwitch: FC<Props> = (props) => {
	const [state, setState] = useState<boolean | undefined>(props.checked);

	useEffect(() => {
		setState(props.checked);
	}, [props.checked]);

	return (
		<Switch
			checked={false}
			onChange={() => setState(!state)}
			className={`${
				state ? 'bg-zinc-900' : 'bg-zinc-700'
			} relative inline-flex items-center h-6 rounded-full w-11`}
		>
			<span
				className={`${
					state ? 'translate-x-6' : 'translate-x-1'
				} inline-block w-4 h-4 transform bg-zinc-500 rounded-full`}
			/>
		</Switch>
	);
};
