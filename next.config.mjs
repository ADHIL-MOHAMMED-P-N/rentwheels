/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        /* hostname config for displaying google profile picture */ protocol:
          "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        /* hostname config for cloudinary picture */ protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
