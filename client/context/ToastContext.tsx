import { createContext, FC, useContext, useMemo, useState } from 'react';
import Toast from '../components/ui/toast/Toast';

interface Toast {
	id: string;
	autoDismiss?: boolean;
	message: string;
	type: 'info' | 'success' | 'warning' | 'error';
}

interface ToastContextType {
	addToast: (toast: Toast) => void;
}

interface Props {
	children?: React.ReactNode;
}

const ToastContext = createContext<ToastContextType>(undefined!);

export function useToast() {
	return useContext(ToastContext);
}

export const ToastProvider: FC<Props> = (props) => {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const contextValue: ToastContextType = useMemo(() => {
		const addToast = (toast: Toast) => {
			console.log(toast);
			setToasts((prev) => [...prev, toast]);
		};
		return { addToast };
	}, []);

	return (
		<>
			<ToastContext.Provider value={contextValue}>
				{props.children}
				<div className="absolute inset-0 w-full h-max z-50 flex flex-col gap-3 p-4 pointer-events-none">
					{toasts.map((toast: Toast) => {
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
