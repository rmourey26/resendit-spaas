import { getFullnodeUrl, SuiClient } from "@mysten/sui/client"
import { createNetworkConfig } from "@mysten/dapp-kit"

// Ensure SUI_NETWORK is one of the supported networks
type SupportedNetworks = "mainnet" | "testnet" | "devnet" | "localnet"
const SUI_NETWORK: SupportedNetworks = (process.env.NEXT_PUBLIC_SUI_NETWORK || "testnet") as SupportedNetworks

// Define network configurations for dapp-kit
export const { networkConfig } = createNetworkConfig({
  mainnet: { url: getFullnodeUrl("mainnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  devnet: { url: getFullnodeUrl("devnet") },
  localnet: { url: "http://127.0.0.1:9000" },
})

// Environment variables for smart contracts
export const SNS_PACKAGE_ID = process.env.NEXT_PUBLIC_SNS_PACKAGE_ID || ""
export const SNS_REGISTRY_ID = process.env.NEXT_PUBLIC_SNS_REGISTRY_ID || ""

/**
 * Creates a Sui client instance for server-side interactions.
 * For client-side usage, prefer the useSuiClient hook from @mysten/dapp-kit.
 */
export function createSuiClient(): SuiClient {
  const fullnodeUrl = getFullnodeUrl(SUI_NETWORK)
  return new SuiClient({ url: fullnodeUrl })
}

/**
 * Get the SuiScan explorer URL for a transaction digest.
 */
export function getExplorerUrl(txDigest: string): string {
  const networkPath = SUI_NETWORK === "mainnet" ? "mainnet" : SUI_NETWORK
  return `https://suiscan.xyz/${networkPath}/tx/${txDigest}`
}

/**
 * Get the SuiScan explorer URL for an object.
 */
export function getObjectExplorerUrl(objectId: string): string {
  const networkPath = SUI_NETWORK === "mainnet" ? "mainnet" : SUI_NETWORK
  return `https://suiscan.xyz/${networkPath}/object/${objectId}`
}

/**
 * Get the current network configuration
 */
export function getCurrentNetwork(): SupportedNetworks {
  return SUI_NETWORK
}

/**
 * Check if the current network is mainnet
 */
export function isMainnet(): boolean {
  return SUI_NETWORK === "mainnet"
}
