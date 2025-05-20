/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["placeholder.svg", "images.unsplash.com"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Desabilitar a pré-renderização estática para páginas protegidas
  experimental: {
    // Isso é para Next.js 13+
    appDir: false,
  },
  // Configurar páginas que não devem ser pré-renderizadas
  exportPathMap: async (defaultPathMap) => {
    // Remover páginas protegidas do mapa de exportação
    const pathMap = { ...defaultPathMap }
    delete pathMap["/dashboard/rewards"]
    delete pathMap["/dashboard"]
    delete pathMap["/dashboard/settings"]
    delete pathMap["/dashboard/withdraw"]
    delete pathMap["/dashboard/deposit"]
    delete pathMap["/dashboard/transactions"]
    delete pathMap["/dashboard/career"]
    delete pathMap["/dashboard/calculator"]
    delete pathMap["/dashboard/notifications"]
    return pathMap
  },
}

module.exports = nextConfig
