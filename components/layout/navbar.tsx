import { FC } from 'react';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';

interface Props {
	actions?: JSX.Element;
}

export const Navbar: FC<Props> = (props) => {
	return (
		<AppBar elevation={0} position="sticky" style={{ marginBottom: 20 }}>
			<Toolbar variant="dense">
				<IconButton></IconButton>
				<Button>Authors</Button>
				<Button>Books</Button>
				<div style={{ flex: 1 }} />
				{props.actions}
			</Toolbar>
		</AppBar>
	);
};
