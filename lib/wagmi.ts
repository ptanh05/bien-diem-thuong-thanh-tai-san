"use client"
import { http, createConfig } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors"

// Ensure WalletConnect Project ID is provided via env.
const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
if (!WC_PROJECT_ID) {
  throw new Error(
    "NEXT_PUBLIC_WC_PROJECT_ID env variable is missing. Please create one in WalletConnect Cloud and set it in .env.local"
  );
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({
      projectId: WC_PROJECT_ID,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
