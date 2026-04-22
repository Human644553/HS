/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
    mdxRs: {
      mdxType: 'gfm',
    },
  },
  turbopack: {
    root: import.meta.dirname,
  },
}

export default nextConfig
