const path = require('path');
const withTM = require('next-transpile-modules')([]);

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.resolve.alias['@'] = path.join(__dirname, 'src');
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'plus.unsplash.com'
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com'
			}
		]
	}
};

module.exports = nextConfig;
