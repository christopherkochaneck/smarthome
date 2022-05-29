import { FC } from 'react';

interface Props {
	className?: string;
	title: string;
	values: string[];
	onChange?: (params: any) => void;
	value: any;
}

export const Select: FC<Props> = (props) => {
	return (
		<>
			<div className="grid gap-2">
				<div className="text-zinc-700">{props.title}</div>
				<select className={`${props.className} bg-zinc-700 p-2`} onChange={props.onChange}>
					{Object.keys(props.values).map((key) => {
						return (
							<option
								value={props.values[parseInt(key)].toLowerCase()}
								key={props.values[parseInt(key)].toLowerCase()}
							>
								{props.values[parseInt(key)]}
							</option>
						);
					})}
				</select>
			</div>
		</>
	);
};
