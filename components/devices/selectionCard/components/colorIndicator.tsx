import { FC } from 'react';
import color from '../../../../interfaces/color';

interface Props {
	color: color;
}

export const ColorIndicator: FC<Props> = (props) => {
	return (
		<>
			<div
				className={`rounded-full h-10 w-10 bg-[rgba(${
					(props.color.red, props.color.green, props.color.blue)
				})]`}
			/>
		</>
	);
};
