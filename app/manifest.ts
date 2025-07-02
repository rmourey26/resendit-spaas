import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Resend-It Ecosystem",
    short_name: "Resend-It",
    description:
      "The Resend-It Ecosystem, built on AetherNet and AetherChain, provides a unified foundation for any industry. AetherNet's secure AI agents (optimally designed for IoT, robotics, autonomous vehicles, drones) standardize intelligent communication. AetherChain offers an immutable trust layer. Together with our Business Optimization Engine, Smart Reusable Packaging-as-a-Service, and Customer Rewards App, we deliver unprecedented efficiency, measurable ROI, and verifiable sustainability.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#34A853",
    icons: [
      {
        src: "/images/resendit-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/resendit-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
