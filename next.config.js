/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placeholder.svg", "images.unsplash.com", "blob.v0.dev"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Desabilitar completamente o App Router
  experimental: {
    appDir: false,
  },
}

module.exports = nextConfig
