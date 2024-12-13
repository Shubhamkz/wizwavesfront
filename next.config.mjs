/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from specific external domains
  images: {
    domains: ["i.scdn.co", "img.freepik.com", "ik.imagekit.io"], // Add any domains you need
  },

  // Extend Webpack configuration to handle video imports
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|ogv)$/, // Video formats you want to support
      type: "asset/resource",
      generator: {
        filename: "static/videos/[name].[hash][ext]", // Defines the output folder for videos
      },
    });

    return config;
  },
};

export default nextConfig;
