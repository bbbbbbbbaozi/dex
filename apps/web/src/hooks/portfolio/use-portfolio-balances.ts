"use client";

import { useAccount, useBalance, useChainId, useReadContracts } from "wagmi";

import {
  getErc20TokensByChainId,
  getNativeTokenByChainId,
  getTokensByChainId,
} from "@/config/tokens";
import type { PortfolioAsset, Token } from "@/types/token";
import { useMemo } from "react";
import { erc20Abi } from "@/abi/erc20";

type UsePortfolioBalancesResult = {
  assets: PortfolioAsset[];
  tokens: Token[];

  isConnected: boolean;
  isSupportedChain: boolean;
  isLoading: boolean;
  isError: boolean;

  error: Error | null;

  refetch: () => void;
};

export function usePortfolioBalaneces(): UsePortfolioBalancesResult {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const tokens = useMemo(() => getTokensByChainId(chainId), [chainId]);
  const nativeToken = useMemo(
    () => getNativeTokenByChainId(chainId),
    [chainId],
  );
  const erc20Tokens = useMemo(
    () => getErc20TokensByChainId(chainId),
    [chainId],
  );

  const isSupportedChain = tokens.length > 0;

  const erc20BalanceContracts = useMemo(() => {
    if (!address) return [];

    return erc20Tokens.map(
      (token) =>
        ({
          address: token.address,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [address],
          chainId,
        }) as const,
    );
  }, [chainId, erc20Tokens, address]);

  const nativeBalanceQuery = useBalance({
    address,
    chainId,
    query: {
      enabled: Boolean(address && nativeToken && isSupportedChain),
    },
  });

  const erc20BalanceQuery = useReadContracts({
    contracts: erc20BalanceContracts,
    query: {
      enabled: Boolean(
        address &&
        erc20BalanceContracts.length > 0 &&
        erc20Tokens.length > 0 &&
        isSupportedChain,
      ),
    },
  });

  const assets = useMemo<PortfolioAsset[]>(() => {
    if (!address || !isSupportedChain) return [];

    const nativeAssets: PortfolioAsset[] =
      nativeToken && nativeBalanceQuery.data
        ? [{ token: nativeToken, balance: nativeBalanceQuery.data.value }]
        : [];

    const erc20Assets: PortfolioAsset[] = erc20Tokens.map((token, index) => {
      const result = erc20BalanceQuery.data?.[index];

      return {
        token,
        balance:
          result?.status === "success" && typeof result.result === "bigint"
            ? result.result
            : 0n,
      };
    });

    return [...nativeAssets, ...erc20Assets];
  }, [
    address,
    isSupportedChain,
    nativeToken,
    nativeBalanceQuery.data,
    erc20Tokens,
    erc20BalanceQuery.data,
  ]);

  return {
    assets,
    tokens,
    isConnected,
    isSupportedChain,
    isLoading: nativeBalanceQuery.isLoading || erc20BalanceQuery.isLoading,
    isError: nativeBalanceQuery.isError || erc20BalanceQuery.isError,
    error:
      nativeBalanceQuery.error instanceof Error
        ? nativeBalanceQuery.error
        : erc20BalanceQuery.error instanceof Error
          ? erc20BalanceQuery.error
          : null,
    refetch: () => {
      void nativeBalanceQuery.refetch();
      void erc20BalanceQuery.refetch();
    },
  };
}
