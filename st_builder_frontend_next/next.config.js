// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Для продакшена
      {
        protocol: 'http',
        hostname: 'api.stbuilder.ru',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.stbuilder.ru',
        pathname: '/uploads/**',
      },
      // Для локальной разработки
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
