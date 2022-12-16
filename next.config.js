/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // rewrites: () => {
  //   return [
  //     {
  //       source: '/api',
  //       destination: 'http://localhost:8080/api',
  //     },
  //     {
  //       source: '/api/graphql',
  //       destination: 'http://localhost:8080/api/graphql',
  //     },
  //   ];
  // },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: [{ loader: '@svgr/webpack', options: { dimensions: false } }],
      }
    );
    return config;
  },
};

module.exports = nextConfig;
