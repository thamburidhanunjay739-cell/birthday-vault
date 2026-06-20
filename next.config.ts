import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Optimization enabled: Next.js will auto-compress & serve WebP
    // This dramatically reduces the 6MB hero image load time
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
