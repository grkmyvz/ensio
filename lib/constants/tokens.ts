export const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
export const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

export const TOKEN_DECIMALS = {
  ETH: 18,
  USDC: 6,
  USDT: 6,
} as const;

export const ERC20_ABI = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const TOKEN_ADDRESSES = {
  USDT: USDT_ADDRESS,
  USDC: USDC_ADDRESS,
} as const;
