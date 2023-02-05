import { FC, useEffect, useState } from 'react';
import { X } from 'tabler-icons-react';

interface Props {
	type: 'info' | 'success' | 'warning' | 'error';
	showClose: boolean;
	onClose: () => void;
	children?: React.ReactNode;
	message?: string;
}

export const Toast: FC<Props> = (props) => {
	const [color, setColor] = useState<string>('');

	useEffect(() => {
		switch (props.type) {
			case 'info':
				setColor('bg-zinc-700');
				break;
			case 'success':
				setColor('bg-green-700');
				break;
			case 'warning':
				setColor('bg-yellow-700');
				break;
			case 'error':
				setColor('bg-red-700');
				break;
			default:
				break;
		}
	}, [props.type]);
	return (
		<div className="flex justify-center pointer-events-none">
			<div className={`p-4 rounded-lg ${color} text-white flex gap-10 shadow-xl`}>
				<div className="">{props.message}</div>
				{props.showClose && (
					<span className="cursor-pointer pointer-events-auto" onClick={props.onClose}>
						<X />
					</span>
				)}
			</div>
		</div>
	);
};

export default Toast;
