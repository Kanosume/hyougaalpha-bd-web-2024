/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  
  // Headers config - will only work through Cloudflare Pages settings
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
  
  // WebAssembly configuration
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
    };
    return config;
  },

  // Images configuration
  images: {
    unoptimized: true,
    domains: ['*'], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Static export configurations
  trailingSlash: true,
  
  // Disable powered by header
  poweredByHeader: false,

  // Customize the build directory
  distDir: '.next',

  // Enable compression
  compress: true,

  // Generate ETags for better caching
  generateEtags: true,

  // Dev specific configs
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },

  // Strict mode for better development
  typescript: {
    ignoreBuildErrors: false,
  },

  // Environment configuration
  env: {
    customKey: 'customValue',
  },

  // Enable SWC minification
  swcMinify: true,

  // Compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
