import { NextPage } from 'next';
import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export const MyDocument: NextPage = () => {
	return (
		<Html>
			<Head>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/icon-512x512.png" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default MyDocument;
