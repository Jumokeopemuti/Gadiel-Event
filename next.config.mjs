/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },

  experimental: {
    middlewareClientMaxBodySize: "50mb",
  },

   allowedDevOrigins: ['192.168.0.174'],


};

export default nextConfig;