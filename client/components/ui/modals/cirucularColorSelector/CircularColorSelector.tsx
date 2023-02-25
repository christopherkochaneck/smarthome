import { Dispatch, FC, SetStateAction } from 'react';
import color from '../../../../interfaces/color';
import { Backdrop } from '../../backdrop/Backdrop';
import { ColorSelector } from './components/ColorSelector';

type Props = {
	setSelectedColor: Dispatch<SetStateAction<color | undefined>>;
	setShowColorSelector: Dispatch<SetStateAction<boolean>>;
};

export const CircularColorSelector: FC<Props> = (props) => {
	return (
		<>
			<div
				style={{
					gap: '20px',
					width: 'max-content',
					height: 'max-content',
					borderRadius: '50%',
					display: 'grid',
					gridTemplateColumns: 'repeat(6, 1fr)',
					gridTemplateRows: 'repeat(6, 1fr)',
				}}
			>
				<ColorSelector
					onClick={() => {
						props.setSelectedColor({ red: 255, green: 0, blue: 0 });
					}}
					className="bg-red-600"
					style={{
						display: 'block',
						borderRadius: '50%',
						textAlign: 'center',
						gridColumn: '3 / span 2',
						gridRow: '1 / span 3',
					}}
				/>
				<ColorSelector
					onClick={() => props.setSelectedColor({ red: 0, green: 255, blue: 0 })}
					className="bg-green-600"
					style={{
						display: 'block',
						borderRadius: '50%',
						textAlign: 'center',
						gridColumn: '1 / span 2',
						gridRow: '2 / span 2',
					}}
				/>
				<ColorSelector
					onClick={() => props.setSelectedColor({ red: 0, green: 0, blue: 255 })}
					className="bg-blue-600"
					style={{
						display: 'block',
						borderRadius: '50%',
						textAlign: 'center',
						gridColumn: '3 / span 2',
						gridRow: '5 / span 2',
					}}
				/>
				<ColorSelector
					onClick={() => props.setSelectedColor({ red: 255, green: 255, blue: 0 })}
					className="bg-yellow-400"
					style={{
						display: 'block',
						borderRadius: '50%',
						textAlign: 'center',
						gridColumn: '5 / span 2',
						gridRow: '2 / span 2',
					}}
				/>
				<ColorSelector
					onClick={() => props.setSelectedColor({ red: 255, green: 255, blue: 255 })}
					className="bg-white"
					style={{
						display: 'block',
						borderRadius: '50%',
						textAlign: 'center',
						gridColumn: '5 / span 2',
						gridRow: '4 / span 2',
					}}
				/>
				<ColorSelector
					onClick={() => props.setSelectedColor({ red: 255, green: 0, blue: 255 })}
					className="bg-purple-700"
					style={{
						display: 'block',
						borderRadius: '50%',
						textAlign: 'center',
						gridColumn: '1 / span 2',
						gridRow: '4 / span 2',
					}}
				/>
			</div>
		</>
	);
};
