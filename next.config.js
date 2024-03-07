// next.config.js

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === "development",
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    // 86400, // Cache duration in seconds (24 hours)
  },
};

module.exports = withPWA(nextConfig);
