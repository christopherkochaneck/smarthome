import { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import Toast from '../components/ui/toast/Toast';

interface ToastType {
	id?: string;
	message: string;
	type: 'info' | 'success' | 'warning' | 'error';
}

interface ToastContextType {
	addToast: (toast: ToastType) => void;
}

interface Props {
	children?: React.ReactNode;
}

const ToastContext = createContext<ToastContextType>(undefined!);

export function useToast() {
	return useContext(ToastContext);
}

export const ToastProvider: FC<Props> = (props) => {
	const [toasts, setToasts] = useState<ToastType[]>([]);
	const [lastToastId, setLastToastId] = useState<string>('');

	useEffect(() => {
		const toastIndex = toasts.findIndex((x) => x.id === lastToastId);
		setTimeout(() => {
			if (toastIndex === -1) return;
			setToasts((prev) => prev.filter((x) => x.id !== lastToastId));
		}, 3000);
	}, [toasts]);

	const contextValue: ToastContextType = useMemo(() => {
		const addToast = (toast: ToastType) => {
			toast.id = v4();
			setToasts((prev) => [...prev, toast]);
			setLastToastId(toast.id);
		};
		return { addToast };
	}, []);

	return (
		<>
			<ToastContext.Provider value={contextValue}>
				{props.children}
				<div
					style={{ bottom: '0px', right: '0px', left: '0px' }}
					className="absolute left-0 right-0 bottom-0 w-full h-max z-50 flex flex-col gap-3 p-4 pointer-events-none"
				>
					{toasts.map((toast: ToastType) => {
						return (
							<Toast
								type={toast.type}
								showClose
								key={toast.id}
								message={toast.message}
								onClose={() => {
									const toastIndex = toasts.findIndex((x) => x.id === toast.id);
									if (toastIndex === -1) return;
									setToasts((prev) => prev.filter((x) => x.id !== toast.id));
								}}
							/>
						);
					})}
				</div>
			</ToastContext.Provider>
		</>
	);
};
