import { arbitrum, bsc, mainnet, polygon } from "wagmi/chains";
import type { Token } from "@/types/token";

export const supportedTokens: Record<number, Token[]> = {
  [mainnet.id]: [
    {
      chainId: mainnet.id,
      type: "native",
      symbol: "ETH",
      name: "Ether",
      decimals: 18,
      coingeckoId: "ethereum",
    },
    {
      chainId: mainnet.id,
      type: "erc20",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      coingeckoId: "usd-coin",
    },
    {
      chainId: mainnet.id,
      type: "erc20",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      coingeckoId: "tether",
    },
    {
      chainId: mainnet.id,
      type: "erc20",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      coingeckoId: "dai",
    },
  ],
  [polygon.id]: [
    {
      chainId: polygon.id,
      type: "native",
      symbol: "POL",
      name: "Polygon Ecosystem Token",
      decimals: 18,
      coingeckoId: "polygon-ecosystem-token",
    },
    {
      chainId: polygon.id,
      type: "erc20",
      address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      coingeckoId: "usd-coin",
    },
  ],
  [bsc.id]: [
    {
      chainId: bsc.id,
      type: "native",
      symbol: "BNB",
      name: "BNB",
      decimals: 18,
      coingeckoId: "binancecoin",
    },
  ],
  [arbitrum.id]: [
    {
      chainId: arbitrum.id,
      type: "native",
      symbol: "ETH",
      name: "Ether",
      decimals: 18,
      coingeckoId: "ethereum",
    },
  ],
};

export function getTokensByChainId(chainId: number): Token[] {
  return supportedTokens[chainId] ?? [];
}

export function getErc20TokensByChainId(chainId: number) {
  return (supportedTokens[chainId] ?? []).filter(
    (token) => token.type === "erc20",
  );
}

export function getNativeTokenByChainId(chainId: number) {
  return (supportedTokens[chainId] ?? []).find(
    (token) => token.type === "native",
  );
}
