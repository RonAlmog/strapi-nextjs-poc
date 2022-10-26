const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["assets.example.com", "lh3.googleusercontent.com"],
    remotePatterns: [{ protocol: "http", hostname: "*.*" }],
  },
};

module.exports = nextConfig;
