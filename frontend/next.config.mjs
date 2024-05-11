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
    ],
  },
  experimental: {
    optimizePackageImports: [
      '@mantine/core',
    ],
    outputFileTracingIncludes: {
      '/**': ['./node_modules/@img/**'],
    },
  },
}

export default withBundleAnalyser(withMDX(nextConfig))
