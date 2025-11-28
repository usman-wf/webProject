/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "nexus-ri4c.onrender.com",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "www.nexuswebsite.me",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "nexuswebsite.me",
        port: "",
        pathname: "/media/**",
      },
    ],
    domains: [
      "localhost",
      "127.0.0.1",
      "nexus-ri4c.onrender.com",
      "www.nexuswebsite.me",
      "nexuswebsite.me",
    ],
    unoptimized: false,
  },
};

export default nextConfig;
