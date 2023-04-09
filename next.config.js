/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    scope: '/',
    skipWaiting: true,
    sw: 'service-worker.js'
})

module.exports = withPWA({
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['i.scdn.co', 't.scdn.co', 'user-images.githubusercontent.com'],
    },
    eslint: {
        ignoreDuringBuilds: true
    }
})