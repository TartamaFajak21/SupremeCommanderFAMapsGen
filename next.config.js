/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ita-hd.stream',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.33'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1'
      },
      {
        protocol: 'https',
        hostname: 'supcomdb.icrack-games.com'
      }
    ]
  },
}

module.exports = nextConfig
