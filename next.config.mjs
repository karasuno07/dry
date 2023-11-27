// const withNextIntl = require('next-intl/plugin')();
// const withPlaiceholder = require('@plaiceholder/next');
import withPlaiceholder from '@plaiceholder/next';
import withNextIntl from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
  },
};

// module.exports = withNextIntl(withPlaiceholder(nextConfig));
export default withNextIntl()(withPlaiceholder(nextConfig));
