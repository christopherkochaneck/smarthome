import { createRef, FC, useEffect, useState } from 'react';

interface Props {
	visible: boolean;
	children?: React.ReactNode;
}

export const ContextMenu: FC<Props> = (props) => {
	const ref = createRef<HTMLDivElement>();
	const [bottom, setBottom] = useState<number>(-1000);

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
		<>
			<div
				ref={ref}
				className="w-full h-max bg-black fixed bottom-0 z-99 rounded-t-3xl flex flex-col gap-3 p-4"
				style={{ bottom: bottom, transition: 'bottom ease 0.15s' }}
			>
				{props.children}
			</div>
		</>
	);
};
