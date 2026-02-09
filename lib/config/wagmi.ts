import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet } from "viem/chains";
import { http } from "wagmi";
import { appConfig } from "./app";

export const wagmiConfig = getDefaultConfig({
  appName: appConfig.app.name,
  projectId: appConfig.rainbowKit.projectId,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(appConfig.rpcs.mainnet),
  },
  ssr: false,
  pollingInterval: 12000,
});
