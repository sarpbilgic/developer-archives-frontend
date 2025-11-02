/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Optimize for faster development builds
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react', '@tanstack/react-query'],
  },
  
  // Faster builds in development
  swcMinify: true,
  
  // Reduce memory usage
  compress: true,
};

export default nextConfig;
