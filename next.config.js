/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply the header to all routes in your application
        source: '/:path*',
        headers: [
          {
            key: 'ngrok-skip-browser-warning',
            value: 'true'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
