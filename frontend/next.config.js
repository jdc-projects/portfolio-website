/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  pageExtensions: ['jsx', 'tsx'],
}

const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
