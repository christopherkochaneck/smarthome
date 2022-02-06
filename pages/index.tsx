import { Button } from '@material-ui/core';
import { Card, CssBaseline } from '@mui/material';
import axios from 'axios';
import type { NextPage } from 'next';
import { LayoutWrapper } from '../components/layout/layout';

function Test() {
	console.log('Works');
	axios.post('https://192.168.1.119/device/light/control?turn=off&id=D8888F');
}

const Home: NextPage = () => {
	return (
		<LayoutWrapper>
			<Button
				onClick={() => {
					console.log('Works');
					axios.post('https://192.168.1.119/device/light/control?turn=off&id=D8888F');
				}}
			>
				Test
			</Button>
		</LayoutWrapper>
	);
};

export default Home;
