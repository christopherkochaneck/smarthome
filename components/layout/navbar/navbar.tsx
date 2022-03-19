import { FC } from 'react';
import HomeIcon from '../../../res/images/home.svg';
import BulbIcon from '../../../res/images/bulb.svg';
import BoxMultipleIcon from '../../../res/images/box-multiple.svg';
import SettingsIcon from '../../../res/images/settings.svg';
import { NavbarButton } from './components/navbarbutton';

export const Navbar: FC = () => {
	return (
		<div className="flex bg-black w-screen h-max">
			<div className="p-1 w-1/4">
				<NavbarButton href="/">
					<HomeIcon />
				</NavbarButton>
			</div>
			<div className="p-1 w-1/4">
				<NavbarButton href="/devices">
					<BulbIcon />
				</NavbarButton>
			</div>
			<div className="p-1 w-1/4">
				<NavbarButton href="/scenes">
					<BoxMultipleIcon />
				</NavbarButton>
			</div>
			<div className="p-1 w-1/4">
				<NavbarButton href="/settings">
					<SettingsIcon />
				</NavbarButton>
			</div>
		</div>
	);
};
