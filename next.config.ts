import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_TOKEN: process.env.API_TOKEN,
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
