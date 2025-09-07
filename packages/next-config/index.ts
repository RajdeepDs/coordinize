// @ts-expect-error No declaration file
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import type { NextConfig } from "next";

export const config: NextConfig = {
  transpilePackages: ["@coordinize/ui", "@coordinize/api"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "o1lk19zcl9.ufs.sh",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "c0nwx4j17a.ufs.sh",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
  webpack(webpackConfig, { isServer }) {
    if (isServer) {
      webpackConfig.plugins = webpackConfig.plugins || [];
      webpackConfig.plugins.push(new PrismaPlugin());
    }

    return webpackConfig;
  },
};
