import createMDX from '@next/mdx'
import createBundleAnalyzer from '@next/bundle-analyzer'
import remarkGfm from 'remark-gfm'
import yn from 'yn'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
  experimental: {
    mdxRs: true,
  },
})

const withBundleAnalyser = createBundleAnalyzer({
  enabled: yn(process.env.ENABLE_BUNDLE_ANALYZER, { default: false }),
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['tsx', 'mdx'],
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: '*.iconduck.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'www.svgrepo.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com',
      },
    ],
  },
  outputFileTracingIncludes: {
    '/**': ['./node_modules/@img/**'],
  },
  experimental: {
    optimizePackageImports: [
      '@mantine/core',
    ],
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports using url-loader
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          'url-loader',
        ],
      },
    )

    return config
  },
}

export default withBundleAnalyser(withMDX(nextConfig))
