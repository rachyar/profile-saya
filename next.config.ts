// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode untuk debugging
  reactStrictMode: true,

  // Optimasi Image
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Compiler Options untuk performa
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental Features
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Performance Budgets
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk untuk libraries
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20
            },
            // Framer Motion terpisah
            framer: {
              name: 'framer',
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Common chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true
            }
          }
        }
      };
    }
    return config;
  },
};

export default nextConfig;