import { FC, HTMLInputTypeAttribute, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'tabler-icons-react';

interface Props {
	className?: string;
	title: string;
	onChange?: (params: React.FormEvent<HTMLInputElement>) => any;
	value?: string;
	pattern?: string;
	type?: HTMLInputTypeAttribute;
}

export const Input: FC<Props> = (props) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [type, setType] = useState<HTMLInputTypeAttribute | undefined>(props.type);

	useEffect(() => {
		showPassword ? setType('text') : setType(props.type);
	}, [showPassword, props.type]);

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="text-white">{props.title}</div>
			<div className={`flex items-center bg-grey p-2 rounded-lg first-letter:${props.className}`}>
				<input
					type={type}
					className={`bg-grey text-white focus:outline-none w-full`}
					onChange={props.onChange}
					value={props.value || undefined}
					pattern={props.pattern}
				/>
				{props.type === 'password' && (
					<button
						className="h-full bg-grey cursor-pointer flex items-center"
						onClick={(e) => {
							e.preventDefault();
							setShowPassword(!showPassword);
						}}
					>
						{showPassword ? <Eye className="text-black" /> : <EyeOff className="text-black" />}
					</button>
				)}
			</div>
		</div>
	);
};
