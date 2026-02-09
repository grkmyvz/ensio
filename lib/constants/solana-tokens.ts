import { PublicKey } from "@solana/web3.js";

export const SOLANA_USDC_ADDRESS =
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
export const SOLANA_USDT_ADDRESS =
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";

export const SOLANA_TOKEN_DECIMALS = {
  SOL: 9,
  USDC: 6,
  USDT: 6,
} as const;

export const SOLANA_TOKEN_ADDRESSES = {
  USDC: new PublicKey(SOLANA_USDC_ADDRESS),
  USDT: new PublicKey(SOLANA_USDT_ADDRESS),
} as const;

export const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
);

export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
);
