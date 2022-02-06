import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
	const theme = createMuiTheme({
		palette: {
			type: 'dark',
		},
	});
	// React.useEffect(() => {
	// 	// Remove the server-side injected CSS.
	// 	const jssStyles = document.querySelector('#jss-server-side');
	// 	if (jssStyles) {
	// 		jssStyles.parentElement.removeChild(jssStyles);
	// 	}
	// }, []);

	return (
		<React.Fragment>
			<Head>
				<title>Smarthome</title>
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</React.Fragment>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};

export default MyApp;
