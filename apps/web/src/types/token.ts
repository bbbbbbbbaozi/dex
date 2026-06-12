export type TokenAdress = `0x${string}`;
export type TokenType = "native" | "erc20";

export type BaseToken = {
  chainId: number;
  type: TokenType;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  coingeckoId?: string;
};

export type NativeToken = BaseToken & {
  type: "native";
  address?: never;
};

export type Erc20Token = BaseToken & {
  type: "erc20";
  address: TokenAdress;
};

export type Token = NativeToken | Erc20Token;

export type PortfolioAsset = {
  token: Token;
  balance: bigint;
  priceUsd?: string; // 单个token的美元价格
  valueUsd?: string; // 用户持仓总价值, 通常: balance * priceUsd
};
