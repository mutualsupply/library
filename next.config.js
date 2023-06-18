/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  experimental: {
    mdxRs: true,
  },
}

// const withMDX = require("@next/mdx")();

// next.config.js

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Configure pageExtensions to include md and mdx
//   pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
//   // Optionally, add any other Next.js config below
//   reactStrictMode: true,
// }

// // Merge MDX config with Next.js config
// module.exports = withMDX(nextConfig)

module.exports = withMDX(nextConfig)
