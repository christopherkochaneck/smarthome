import { FC } from 'react';

export const Card: FC = (props) => {
	return (
		<div className="bg-zinc-900 text-center hover:cursor-pointer w-full h-full rounded-2 grid justify-center align-middle rounded-xl">
			{props.children}
		</div>
	);
};
