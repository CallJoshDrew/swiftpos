// next.config.js
const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    // 86400, // Cache duration in seconds (24 hours)
  },
  pwa: {
    dest: "public",
    register: true,
    disable: process.env.NODE_ENV === "development",
    skipWaiting: true,
  },
};

module.exports = withPWA(nextConfig);
