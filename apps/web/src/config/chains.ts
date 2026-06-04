import { mainnet, sepolia, polygon, arbitrum } from "wagmi/chains";

export const supportChains = [mainnet, sepolia, polygon, arbitrum] as const;

export const chainNames: Record<number, string> = {
  [mainnet.id]: "Ethereum",
  [sepolia.id]: "Sepolia",
  [polygon.id]: "Polygon",
  [arbitrum.id]: "Arbitrum",
};
