import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { RGBW2 } from '../../../../devices/rgbw2';
import color from '../../../../interfaces/color';

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	setSelectedColor: Dispatch<SetStateAction<color | undefined>>;
	device: RGBW2;
	brightness: number;
	setBrightness: Dispatch<SetStateAction<number>>;
}

export const RGBW2Modal: FC<Props> = (props) => {
	return (
		<Dialog
			open={props.open}
			onClose={() => {
				props.setOpen(false);
			}}
			className="fixed inset-0 z-10 overflow-y-auto grid justify-items-center"
		>
			<div className="flex flex-col gap-y-10 items-center justify-center h-screen">
				<Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
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
						onClick={() => {
							props.setSelectedColor({ red: 255, green: 0, blue: 0 });
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
						onClick={() => {
							props.setSelectedColor({ red: 0, green: 255, blue: 0 });
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
						onClick={() => {
							props.setSelectedColor({ red: 0, green: 0, blue: 255 });
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
						onClick={() => {
							props.setSelectedColor({ red: 255, green: 255, blue: 0 });
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
						onClick={() => {
							props.setSelectedColor({ red: 255, green: 255, blue: 255 });
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
						onClick={() => {
							props.setSelectedColor({ red: 255, green: 0, blue: 255 });
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
				<input
					type="range"
					className="relative"
					min="0"
					max="100"
					step="1"
					value={props.brightness}
					onChange={(e) => props.setBrightness(parseInt(e.target.value))}
				/>
			</div>
		</Dialog>
	);
};
