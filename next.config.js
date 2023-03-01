const { withSentryConfig } = require('@sentry/nextjs');
const { withContentlayer } = require('next-contentlayer');
const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    mdxRs: true,
  },
};

module.exports = withMDX(
  withContentlayer(
    withSentryConfig(nextConfig, { silent: true }, { hideSourcemaps: true }),
  ),
);
