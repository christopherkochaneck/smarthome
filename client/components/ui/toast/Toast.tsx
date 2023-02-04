import { createRef, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { X } from 'tabler-icons-react';

interface Props {
	type: 'info' | 'success' | 'warning' | 'error';
	showClose: boolean;
	children?: React.ReactNode;
	visible?: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
}

export const Toast: FC<Props> = (props) => {
	const ref = createRef<HTMLDivElement>();
	const [bottom, setBottom] = useState<number>(-1000);
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

	useEffect(() => {
		if (!props.visible) {
			if (ref.current !== null) {
				setBottom(-ref.current.clientHeight);
			}
		} else {
			setBottom(0);
		}
	}, [props.visible, ref]);

	return (
		<div
			ref={ref}
			className="fixed inset-x-0 p-4 w-full flex justify-center"
			style={{ bottom: bottom, transition: 'bottom ease 0.3s' }}
		>
			<div className={`p-4 rounded-lg ${color} text-white flex gap-10 shadow-xl`}>
				<div className="">{props.children}</div>
				{props.showClose && (
					<span className="cursor-pointer" onClick={() => props.setVisible(false)}>
						<X />
					</span>
				)}
			</div>
		</div>
	);
};

export default Toast;
