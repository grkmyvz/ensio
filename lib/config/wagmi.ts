import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "viem/chains";
import { http } from "wagmi";
import { appConfig } from "./app";

export const wagmiConfig = getDefaultConfig({
  appName: appConfig.app.name,
  projectId: appConfig.rainbowKit.projectId,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(appConfig.rpcs.mainnet),
    [sepolia.id]: http(appConfig.rpcs.sepolia),
  },
  ssr: false,
  pollingInterval: 12000,
});
