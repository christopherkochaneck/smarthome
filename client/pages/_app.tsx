import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '../styles/globals.scss';
import { DeviceProvider } from '../context/DeviceContext';
import { GroupProvider } from '../context/GroupContext';
import { SceneProvider } from '../context/SceneContext';
import { ToastProvider } from '../context/ToastContext';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<React.Fragment>
			<Head>
				<title>Smarthome</title>
			</Head>
			<ToastProvider>
				<SceneProvider>
					<GroupProvider>
						<DeviceProvider>
							<Component {...pageProps} />
						</DeviceProvider>
					</GroupProvider>
				</SceneProvider>
			</ToastProvider>
		</React.Fragment>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};

export default MyApp;
