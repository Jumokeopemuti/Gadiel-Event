/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },

  experimental: {
    middlewareClientMaxBodySize: "50mb",
  },
};

export default nextConfig;