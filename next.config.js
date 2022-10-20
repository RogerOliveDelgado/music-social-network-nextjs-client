/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'en.wikipedia.org',
      'upload.wikimedia.org',
      'via.placeholder.com',
      'i.scdn.co',
      'res.cloudinary.com'
    ],
  },
  i18n: {
    locales: ['en', 'es', 'fr'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
