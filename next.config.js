// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ita-hd.stream',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.33'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1'
      },
      {
        protocol: 'https',
        hostname: 'supcomdb.icrack-games.com'
      }
    ]
  },
}

module.exports = nextConfig

module.exports = withSentryConfig(
  module.exports,
  { silent: true },
  { hideSourcemaps: true },
);
