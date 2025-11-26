/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: '127.0.0.1',
        port: '',
        pathname: '/media/**',
      },
    ],
    domains: ['localhost', '127.0.0.1'],
    unoptimized: false,
  },
};

export default nextConfig;
