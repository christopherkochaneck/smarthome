import { FC } from 'react';
import { BoxMultiple, Bulb, Home, Settings } from 'tabler-icons-react';
import { NavbarButton } from './components/navbarbutton';

export const Navbar: FC = () => (
	<div className="flex bg-black w-screen h-16">
		<div className="p-1 w-1/4">
			<NavbarButton href="/">
				<Home className="h-8 w-8" />
			</NavbarButton>
		</div>
		<div className="p-1 w-1/4">
			<NavbarButton href="/devices">
				<Bulb className="h-8 w-8" />
			</NavbarButton>
		</div>
		<div className="p-1 w-1/4">
			<NavbarButton href="/groups">
				<BoxMultiple className="h-8 w-8" />
			</NavbarButton>
		</div>
		<div className="p-1 w-1/4">
			<NavbarButton href="/settings">
				<Settings className="h-8 w-8" />
			</NavbarButton>
		</div>
	</div>
);
