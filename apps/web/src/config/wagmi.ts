import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { supportChains } from "@/config/chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) throw new Error("Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID");

export const wagmiConfig = getDefaultConfig({
  appName: "dex",
  projectId,
  chains: supportChains,
  ssr: true,
});
