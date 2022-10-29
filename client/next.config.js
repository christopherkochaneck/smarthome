/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === 'development',
	scope: '/',
	sw: 'sw.js',
});

const nextConfig = {
	images: {
		domains: ['lh3.googleusercontent.com'],
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		return config;
	},
	reactStrictMode: false,
};

module.exports = withPWA(nextConfig);
