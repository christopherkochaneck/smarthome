import { Dispatch, FC, SetStateAction } from 'react';
import { Dialog } from '@headlessui/react';
import { RGBW2 } from '../../../../devices/rgbw2';
import color from '../../../../interfaces/color';
import { Backdrop } from '../../backdrop/Backdrop';

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	setSelectedColor: Dispatch<SetStateAction<color | undefined>>;
	device?: RGBW2;
	devices?: RGBW2[];
	brightness?: number;
	setBrightness?: Dispatch<SetStateAction<number>>;
}

export const RGBW2Modal: FC<Props> = (props) => {
	const handleClick = (color: color) => {
		props.setSelectedColor(color);
	};
	return (
		<Dialog
			open={props.open}
			onClose={() => {
				props.setOpen(false);
			}}
			className="fixed inset-0 z-10 overflow-y-auto grid justify-items-center"
		>
			<div className="flex flex-col gap-y-10 items-center justify-center h-screen">
				<Dialog.Overlay className="fixed inset-0">
					<Backdrop visible={true} onClick={() => props.setOpen(false)} />
				</Dialog.Overlay>
				<div
					className="relative rounded w-max h-max"
					style={{
						width: 'max-content',
						height: 'max-content',
						borderRadius: '50%',
						display: 'grid',
						gap: '10px',
						gridTemplateColumns: 'repeat(6, 1fr)',
						gridTemplateRows: 'repeat(6, 1fr)',
					}}
				>
					<div
						className="bg-red-600 rounded-full w-20 h-20 hover:cursor-pointer"
						onClick={async () => {
							let color = { red: 255, green: 0, blue: 0 };
							props.setSelectedColor(color);
							handleClick(color);
						}}
						style={{
							display: 'block',
							borderRadius: '50%',
							textAlign: 'center',
							gridColumn: '3 / span 2',
							gridRow: '1 / span 3',
						}}
					/>
					<div
						className="bg-green-600 rounded-full w-20 h-20 hover:cursor-pointer"
						onClick={async () => {
							let color = { red: 0, green: 255, blue: 0 };
							props.setSelectedColor(color);
							handleClick(color);
						}}
						style={{
							display: 'block',
							borderRadius: '50%',
							textAlign: 'center',
							gridColumn: '1 / span 2',
							gridRow: '2 / span 2',
						}}
					/>
					<div
						className="bg-blue-600 rounded-full w-20 h-20 hover:cursor-pointer"
						onClick={async () => {
							let color = { red: 0, green: 0, blue: 255 };
							props.setSelectedColor(color);
							handleClick(color);
						}}
						style={{
							display: 'block',
							borderRadius: '50%',
							textAlign: 'center',
							gridColumn: '5 / span 2',
							gridRow: '2 / span 2',
						}}
					/>
					<div
						className="bg-yellow-400 rounded-full w-20 h-20 hover:cursor-pointer"
						onClick={async () => {
							let color = { red: 255, green: 255, blue: 0 };
							props.setSelectedColor(color);
							handleClick(color);
						}}
						style={{
							display: 'block',
							borderRadius: '50%',
							textAlign: 'center',
							gridColumn: '5 / span 2',
							gridRow: '4 / span 2',
						}}
					/>
					<div
						className="bg-white rounded-full w-20 h-20 hover:cursor-pointer"
						onClick={async () => {
							let color = { red: 255, green: 255, blue: 255 };
							props.setSelectedColor(color);
							handleClick(color);
						}}
						style={{
							display: 'block',
							borderRadius: '50%',
							textAlign: 'center',
							gridColumn: '3 / span 2',
							gridRow: '5 / span 2',
						}}
					/>
					<div
						className="bg-purple-700 rounded-full w-20 h-20 hover:cursor-pointer"
						onClick={async () => {
							let color = { red: 255, green: 0, blue: 255 };
							props.setSelectedColor(color);
							handleClick(color);
						}}
						style={{
							display: 'block',
							borderRadius: '50%',
							textAlign: 'center',
							gridColumn: '1 / span 2',
							gridRow: '4 / span 2',
						}}
					/>
				</div>
			</div>
		</Dialog>
	);
};