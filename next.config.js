// next.config.js

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === "development",
  skipWaiting: true,
  swSrc: '/public/service-worker.js',  // Correct path to your custom service worker file
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    // 86400, // Cache duration in seconds (24 hours)
  },
};

module.exports = withPWA(nextConfig);
