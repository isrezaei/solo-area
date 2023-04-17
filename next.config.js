/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    scope: "/"
})

module.exports = withPWA({
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['i.scdn.co', 't.scdn.co', 'user-images.githubusercontent.com']
    },
    eslint: {
        ignoreDuringBuilds: true
    }
})