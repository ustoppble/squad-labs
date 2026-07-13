/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Stylistic lint must not block a green production build.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
