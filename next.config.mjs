/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },

  // webpack: (config, { dev }) => {
  //   if (dev) {
  //     config.watchOptions = {
  //       // Watch only ./src/components
  //       ignored: [
  //         '**/.next/**', // Ignore everything by default
  //         '**/node_modules/**', // Except this folder
  //         '**/public/**',
  //       ],
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;
