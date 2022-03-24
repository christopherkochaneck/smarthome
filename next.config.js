/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		domains: ['lh3.googleusercontent.com'],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		return config;
	},
	reactStrictMode: true,
	env: { OPEN_WEATHER_MAP_API_KEY: process.env.OPEN_WEATHER_MAP_API_KEY },
};

module.exports = nextConfig;
