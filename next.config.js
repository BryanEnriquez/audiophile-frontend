/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(process.env.NODE_ENV === 'development' && {
    // https://nextjs.org/docs/api-reference/next.config.js/rewrites
    rewrites: async () => {
      return [
        {
          source: '/uploads/:image*',
          destination: `${process.env.API_UPLOADS_URL}:image*`,
        },
      ];
    },
  }),
};

module.exports = nextConfig;
