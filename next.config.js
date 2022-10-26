/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "en.wikipedia.org",
      "upload.wikimedia.org",
      "via.placeholder.com",
      "i.scdn.co",
      "res.cloudinary.com",
    ],
  },
  i18n: {
    locales: ["en", "es", "fr"],
    defaultLocale: "en",
  },
  async rewrites(){
    return [
      {
        source: '/signIn',
        destination: 'http://localhost:4001/signIn'
      },
      {
        source: '/BASE_URL_USERS/:userID*',
        destination: 'http://localhost:4001/users/user/:userID*'
      }
    ]
  }
};





module.exports = nextConfig;
