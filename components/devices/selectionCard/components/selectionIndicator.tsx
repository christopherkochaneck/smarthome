import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
	selected: boolean;
	setSelected: Dispatch<SetStateAction<boolean>>;
}

export const SelectionIndicator: FC<Props> = (props) => {
	return (
		<>
			<div
				className={`rounded-full h-10 w-10 ${
					props.selected ? 'bg-black' : 'bg-transparent'
				} border border-black`}
			/>
		</>
	);
};
