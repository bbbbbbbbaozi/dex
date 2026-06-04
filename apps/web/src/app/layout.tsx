import type { Metadata } from "next";
import { Web3Provider } from "@/providers/web3-provider";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "DEX",
  description:
    "一个具备生产环境标准、高度关注UI/UX与RPC性能优化的多链Web3资产看板与去中心化DEX应用",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
