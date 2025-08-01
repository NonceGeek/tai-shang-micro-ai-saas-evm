import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { metisSepolia } from "@reown/appkit/networks";
import type { Chain } from "viem";

export const projectId = process.env.NEXT_PUBLIC_WALLET_PROJECT_ID;

if (!projectId) {
  throw new Error(
    "NEXT_PUBLIC_WALLET_PROJECT_ID is not defined. Please set it in .env.local"
  );
}

export const networks: [Chain, ...Chain[]] = [metisSepolia];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
