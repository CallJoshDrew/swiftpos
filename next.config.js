/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    // 86400, // Cache duration in seconds (24 hours)
  },
};

module.exports = nextConfig;
