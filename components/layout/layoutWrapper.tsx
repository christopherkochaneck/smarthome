import { FC } from 'react';
import { Appbar } from './appbar/appbar';
import { Navbar } from './navbar/navbar';

interface Props {
	appBarTitle?: string;
	showAppbar: boolean;
	showAppbarIcon: boolean;
}
export const LayoutWrapper: FC<Props> = (props) => {
	return (
		<div className="flex flex-col h-screen bg-[#121212]">
			<header>
				<Appbar
					showAppbar={props.showAppbar}
					title={props.appBarTitle}
					showAddIcon={props.showAppbar}
				/>
			</header>
			<main className="flex-1">
				<div className="p-4">{props.children}</div>
			</main>
			<footer>
				<Navbar />
			</footer>
		</div>
	);
};
