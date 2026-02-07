/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['*.crispy-happiness-977v4qjqvq6rhxpwp-3000.app.github.dev', '*,localhost:3000'],
    }
  }
};

export default nextConfig;
