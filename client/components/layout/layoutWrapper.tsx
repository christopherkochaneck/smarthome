import { FC } from 'react';
import { Appbar } from './appbar/appbar';
import { Navbar } from './navbar/navbar';

interface Props {
	appBarTitle?: string;
	showAppbar?: boolean;
	showAppbarIcon?: boolean;
	href?: string;
	children?: React.ReactNode;
	showBackButton?: boolean;
	className?: string;
	hideNavbar?: boolean;
}
export const LayoutWrapper: FC<Props> = (props) => {
	return (
		<div className="absolute top-0 left-0 flex flex-col h-screen bg-darkgrey">
			<header>
				<Appbar
					href={props.href}
					showAppbar={props.showAppbar}
					title={props.appBarTitle}
					showAddIcon={props.showAppbarIcon}
					showBackButton={props.showBackButton}
				/>
			</header>
			<main className="flex-1 overflow-auto">
				<div className={`${props.className} p-4`}>{props.children}</div>
			</main>
			<footer>{!props.hideNavbar && <Navbar />}</footer>
		</div>
	);
};
