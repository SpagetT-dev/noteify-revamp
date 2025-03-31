/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/ollama/:path*",
        destination: "http://localhost:11434/:path*",
      },
    ];
  },
};

export default nextConfig;