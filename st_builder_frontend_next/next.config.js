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
      {
        protocol: 'http',
        hostname: `${process.env.NEXT_PUBLIC_API_URL || 'localhost'}`,
        port: '3000',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
