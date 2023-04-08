/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify : true,
  images : {
    domains: ['i.scdn.co' , 't.scdn.co' , 'user-images.githubusercontent.com'],
    unoptimized: false,
    formats: ['image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizeFonts: true,
    optimizeCss: true
  },

}

module.exports = nextConfig
