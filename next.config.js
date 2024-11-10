/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Changed from 'export' to 'standalone' for Cloudflare Pages
  reactStrictMode: true,
  
  // Headers config won't work with static export, but keeping for development
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'ngrok-skip-browser-warning',
            value: 'true'
          }
        ]
      }
    ];
  },
  
  // Keep WebAssembly config
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
    };
    return config;
  },

  // Add images configuration for Cloudflare Pages
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
