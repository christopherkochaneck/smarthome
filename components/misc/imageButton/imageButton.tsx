import { FC } from 'react';
import Image from 'next/image';

interface Props {
	picture: string;
}

export const ImageButton: FC<Props> = (props) => {
	return (
		<div className="border-2 bg-slate-600 w-full h-full">
			<Image src={props.picture} />
		</div>
	);
};
