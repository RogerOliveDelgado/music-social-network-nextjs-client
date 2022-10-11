/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'en.wikipedia.org',
      'upload.wikimedia.org',
      'via.placeholder.com',
      'i.scdn.co',
    ],
  },
  i18n: {
    locales: ['en', 'es', 'fr'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
