/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Changed to 'export' for static site deployment
  reactStrictMode: true,
  
  // Headers config won't work with static export
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

  // Images configuration
  images: {
    unoptimized: true,
    domains: ['**'], // Allow all domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Add base path if needed
  // basePath: '',

  // Disable server-side features since we're doing static export
  trailingSlash: true,
};

module.exports = nextConfig;
