import { FC, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RGBW2 } from '../../../../devices/rgbw2';

interface Props {
	open: boolean;
	device: RGBW2;
}

export const RGBW2Modal: FC<Props> = (props) => {
	const [open, setOpen] = useState(props.open);
	const [device, setDevice] = useState(props.device);

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(!open)}
			className="fixed z-10 inset-0 overflow-y-auto grid justify-items-center"
		>
			<div className="flex items-center justify-center h-screen">
				<Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
				<div
					className="relative rounded mx-auto w-screen "
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
							await device.setColor({ red: 255, green: 0, blue: 0 });
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
							await device.setColor({ red: 0, green: 255, blue: 0 });
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
							await device.setColor({ red: 0, green: 0, blue: 255 });
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
							await device.setColor({ red: 255, green: 255, blue: 0 });
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
							await device.setColor({ red: 255, green: 255, blue: 255 });
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
							await device.setColor({ red: 255, green: 0, blue: 255 });
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
