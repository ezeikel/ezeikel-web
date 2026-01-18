import type { NextConfig } from 'next';
import { withPlausibleProxy } from 'next-plausible';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  // Image configuration
  images: {
    remotePatterns: [
      // Sanity CDN
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Pexels
      { protocol: 'https', hostname: 'images.pexels.com' },
      // Social media
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: '*.cdninstagram.com' },
      // OpenAI/Gemini generated images
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
      },
    ],
  },
};

// Apply middleware wrappers
const configWithPlausible = withPlausibleProxy()(nextConfig);

// Apply Sentry config for source maps and error tracking
const configWithSentry = withSentryConfig(configWithPlausible, {
  // Suppresses source map uploading logs during build
  silent: true,
  // Organization and project from env vars
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
  // Hides source maps from generated client bundles
  hideSourceMaps: true,
  // Delete source maps after uploading to Sentry
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
});

export default configWithSentry;
