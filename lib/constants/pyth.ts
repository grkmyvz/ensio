export const PYTH_CONTRACT_ADDRESS =
  "0x4305FB66699C3B2702D4d05CF36551390A4c69C6";

export const PYTH_PRICE_FEED_IDS = {
  ETH_USD: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  SOL_USD: "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
} as const;

export const PYTH_ABI = [
  {
    inputs: [{ internalType: "bytes32", name: "id", type: "bytes32" }],
    name: "getPriceUnsafe",
    outputs: [
      {
        components: [
          { internalType: "int64", name: "price", type: "int64" },
          { internalType: "uint64", name: "conf", type: "uint64" },
          { internalType: "int32", name: "expo", type: "int32" },
          { internalType: "uint256", name: "publishTime", type: "uint256" },
        ],
        internalType: "struct PythStructs.Price",
        name: "price",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
