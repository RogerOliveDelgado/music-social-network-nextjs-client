/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'en.wikipedia.org',
      'upload.wikimedia.org',
      'via.placeholder.com',
    ],
  },
};

module.exports = nextConfig;
