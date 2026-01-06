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
      {
        protocol: 'https',
        hostname: 'pub-e504ed7090c14be3b5c4d64daec5ce56.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
