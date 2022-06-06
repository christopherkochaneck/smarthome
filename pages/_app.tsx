import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '../styles/globals.scss';
import { DeviceProvider } from '../context/DeviceContext';
// import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<React.Fragment>
			<Head>
				<title>Smarthome</title>
			</Head>
			<DeviceProvider>
				<Component {...pageProps} />
			</DeviceProvider>
		</React.Fragment>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};

export default MyApp;
