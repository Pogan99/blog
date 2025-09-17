/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'bsuhbjezngvrmcqjkypy.supabase.co'],
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/blog'
      }
    ]
  }
}

module.exports = nextConfig
