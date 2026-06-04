import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { supportChains } from "@/config/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "dex",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  chains: supportChains,
  ssr: true,
});
