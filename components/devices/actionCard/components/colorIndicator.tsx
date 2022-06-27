import { FC, useEffect } from 'react';
import color from '../../../../interfaces/color';

interface Props {
	color: color;
}
export const ColorIndicator: FC<Props> = (props) => {
	return (
		<>
			<div
				className={`rounded-full border border-black h-10 w-10 bg-[rgb(${props.color.red},${props.color.green},${props.color.blue})]`}
			/>
		</>
	);
};
