const isDevelopment = process.env.NODE_ENV === "development";

export const appConfig = {
  isDevelopment,
  app: {
    name: "Ensio",
    description: "Bridge your ENS identity with crypto donations.",
    url: "https://ensio.app",
  },
  rainbowKit: {
    projectId:
      process.env.NEXT_PUBLIC_RAINBOW_KIT_PROJECT_ID ||
      "58e5c69eb06ac3a32f598fca5f819f97",
  },
  rpcs: {
    mainnet: process.env.NEXT_PUBLIC_MAINNET_RPC_URL || "https://eth.drpc.org",
    sepolia:
      process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://sepolia.drpc.org",
  },
  solana: {
    network: (process.env.NEXT_PUBLIC_SOLANA_NETWORK || "mainnet-beta") as
      | "mainnet-beta"
      | "devnet"
      | "testnet",
    rpcEndpoint:
      process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
      "https://api.mainnet-beta.solana.com",
  },
  ipfs: {
    gateway:
      process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://cloudflare-ipfs.com",
    fallbackGateways: [
      "https://ipfs.io",
      "https://dweb.link",
      "https://gateway.pinata.cloud",
    ],
  },
} as const;
