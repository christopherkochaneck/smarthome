import { FC, useState } from 'react';

interface Props {
	title: string;
	onClick?: (e?: any) => void;
}

export const Tab: FC<Props> = (props) => {
	const [selected, setSelected] = useState<boolean>(false);
	return (
		<>
			<div
				onClick={() => {
					props.onClick;
					setSelected(true);
				}}
				className={`${selected ? 'border-b-2 border-zinc-700' : ''} text-white`}
			>
				{props.title}
			</div>
		</>
	);
};
