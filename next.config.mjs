/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-f9184b8b10a6492da887a1c37e229913.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
