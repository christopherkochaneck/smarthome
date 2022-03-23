import { FC } from 'react';
import { Navbar } from './navbar/navbar';

export const LayoutWrapper: FC = (props) => {
	return (
		<div className="flex flex-col h-screen bg-[#121212]">
			<header></header>
			<main className="flex-1">
				<div className="p-4">{props.children}</div>
			</main>
			<footer>
				<Navbar />
			</footer>
		</div>
	);
};
