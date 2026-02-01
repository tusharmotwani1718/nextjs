/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
  'http://localhost',
  'http://localhost:5173',
  'null',
]
};


export default nextConfig;
