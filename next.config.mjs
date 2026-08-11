import { withContentCollections } from '@content-collections/next'
import createMDX from '@next/mdx'
import createBundleAnalyzer from '@next/bundle-analyzer'
import yn from 'yn'

const withMDX = createMDX({
  options: {
    // String format required for Turbopack compatibility — function refs
    // can't be serialized to the Rust compiler.
    // https://nextjs.org/docs/app/guides/mdx#using-plugins-with-turbopack
    remarkPlugins: [
      'remark-gfm',
      'remark-frontmatter',
      'remark-mdx-frontmatter',
    ],
    rehypePlugins: [],
  },
})

const withBundleAnalyser = createBundleAnalyzer({
  enabled: yn(process.env.ENABLE_BUNDLE_ANALYZER, { default: false }),
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Bust the prerender cache when ENABLE_MDX_TEST_PAGE changes — see app/mdx-test/page.tsx.
  generateBuildId: () => yn(process.env.ENABLE_MDX_TEST_PAGE, { default: false }) ? 'mdx-test-on' : 'mdx-test-off',
  pageExtensions: ['tsx', 'mdx'],
  productionBrowserSourceMaps: true,
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
  experimental: {
    optimizePackageImports: [
      '@mantine/core',
    ],
  },
}

export default withContentCollections(withBundleAnalyser(withMDX(nextConfig)))
