/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  // rewrites: () => {
  //   return [
  //     {
  //       source: '/api/:path*",',
  //       destination: 'http://data.ansm.sante.fr/api/:path*',
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
