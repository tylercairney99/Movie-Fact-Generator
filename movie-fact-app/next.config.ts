import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Allows Google profile images 
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

// 