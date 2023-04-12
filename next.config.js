/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: "/",
    skipWaiting: true,
    sw: 'service-worker.js',
    icon: {
        // path: 'static/logo.png',
        // purpose: 'maskable any',
    }
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