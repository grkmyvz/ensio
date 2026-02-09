import { TokenName } from "@/lib/types/chains";

export const QUICK_DONATION_AMOUNTS = [1, 5, 10, 25] as const;

export const NETWORK_TOKENS: Record<string, TokenName[]> = {
  ethereum: ["ETH", "USDC", "USDT"],
  solana: ["SOL", "USDC", "USDT"],
};
