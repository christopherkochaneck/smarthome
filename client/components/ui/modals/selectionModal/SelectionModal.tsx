import { FC } from 'react';
import { Card } from '../../card/card';
import { AlertTriangle } from 'tabler-icons-react';

export type modalOption = 'cancel' | 'abort' | 'no' | 'ok' | 'yes' | 'confirm';

type Props = {
	message: string;
	options?: modalOption[];
	onCancel?: () => void;
	onAbort?: () => void;
	onNo?: () => void;
	onOk?: () => void;
	onYes?: () => void;
	onConfirm?: () => void;
};

export const SelectionModal: FC<Props> = (props) => {
	return (
		<Card
			className="w-max rounded-lg p-4 flex flex-col items-center gap-4 text-white"
			pointerOnHover
		>
			<AlertTriangle className="w-16 h-16" />
			<div>{props.message}</div>
			<span className="flex gap-2">
				{props.options?.includes('cancel') && (
					<button className="p-4 pt-2 pb-2 bg-black rounded-lg" onClick={props.onCancel}>
						Cancel
					</button>
				)}
				{props.options?.includes('abort') && (
					<button className="p-4 pt-2 pb-2 bg-black rounded-lg" onClick={props.onAbort}>
						Abort
					</button>
				)}
				{props.options?.includes('no') && (
					<button className="p-4 pt-2 pb-2 bg-black rounded-lg" onClick={props.onNo}>
						No
					</button>
				)}
				{props.options?.includes('ok') && (
					<button className="p-4 pt-2 pb-2 bg-black rounded-lg" onClick={props.onOk}>
						Ok
					</button>
				)}
				{props.options?.includes('yes') && (
					<button className="p-4 pt-2 pb-2 bg-black rounded-lg" onClick={props.onYes}>
						Ok
					</button>
				)}
				{props.options?.includes('confirm') && (
					<button className="p-4 pt-2 pb-2 bg-black rounded-lg" onClick={props.onConfirm}>
						Confirm
					</button>
				)}
			</span>
		</Card>
	);
};
