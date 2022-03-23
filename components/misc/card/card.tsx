import { FC } from 'react';

export const Card: FC = (props) => {
	return (
		<div className="bg-zinc-800 text-center hover:cursor-pointer w-full h-full rounded-xl">
			{props.children}
		</div>
	);
};
