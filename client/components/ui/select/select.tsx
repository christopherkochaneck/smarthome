import { FC } from 'react';

interface Props {
	className?: string;
	title?: string;
	values: string[];
	onChange?: (params: any) => void;
	value: any;
}

export const Select: FC<Props> = (props) => {
	return (
		<>
			<div className="grid gap-2">
				<div className="text-white">{props.title}</div>
				<select className={`${props.className} bg-grey text-white p-2`} onChange={props.onChange}>
					{props.values.map((x) => (
						<option key={x} value={x.toLowerCase()}>
							{x}
						</option>
					))}
				</select>
			</div>
		</>
	);
};
