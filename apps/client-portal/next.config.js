//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require("@nx/next");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
/** @type {import('next').NextConfig} */
const nextConfig = {
	nx: {
		// Set this to true if you would like to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},
	experimental: {
		instrumentationHook: true
	},
	reactStrictMode: true,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true
	}
};

const wrapper =
	process.env.ANALYZE === "true"
		? require("@next/bundle-analyzer")({
			enabled: true,
		})
		: // @ts-ignore
		arg => arg;
const { withSentryConfig } = require("@sentry/nextjs");

const config =
	process.env.SENTRY_DISABLE === "true"
		? wrapper(nextConfig)
		: withSentryConfig(
			wrapper(nextConfig),
			{
				// For all available options, see:
				// https://github.com/getsentry/sentry-webpack-plugin#options

				// Suppresses source map uploading logs during build
				silent: true,
				org: process.env.SENTRY_ORG,
				project: process.env.SENTRY_PROJECT,

				// For all available options, see:
				// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

				// Upload a larger set of source maps for prettier stack traces (increases build time)
				widenClientFileUpload: true,

				// Transpiles SDK to be compatible with IE11 (increases bundle size)
				// transpileClientSDK: true,

				// Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
				tunnelRoute: "/monitoring",

				// Hides source maps from generated client bundles
				hideSourceMaps: true,

				// Automatically tree-shake Sentry logger statements to reduce bundle size
				disableLogger: true,

				// Enables automatic instrumentation of Vercel Cron Monitors.
				// See the following for more information:
				// https://docs.sentry.io/product/crons/
				// https://vercel.com/docs/cron-jobs
				automaticVercelMonitors: true,
			},
		);

const plugins = [
	// Add more Next.js plugins to this list if needed.
	withNx,
];

module.exports = composePlugins(...plugins)(config);
