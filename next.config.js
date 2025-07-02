/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The `transpilePackages` option is crucial for ensuring that the Mysten Labs
  // packages, which may use modern JS features, are correctly processed by the Next.js build system.
  transpilePackages: ["@mysten/dapp-kit", "@mysten/sui"],
  webpack: (config) => {
    // This alias helps with some module resolution issues that can occur with the Sui SDK.
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx"],
      ".mjs": [".mjs", ".mts"],
    }
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
