const { withSentryConfig } = require('@sentry/nextjs');
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
    ],
  },
};

module.exports = withContentlayer(
  withSentryConfig(nextConfig, { silent: true }, { hideSourcemaps: true }),
);
