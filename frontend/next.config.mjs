/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Webpack config for production builds and when using --webpack flag
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  // Empty turbopack config to silence the warning about webpack config
  // Reown AppKit works fine with Turbopack without additional configuration
  turbopack: {},
};

export default nextConfig;
