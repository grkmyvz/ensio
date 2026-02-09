"use client";

import { useReadContracts } from "wagmi";
import {
  PYTH_CONTRACT_ADDRESS,
  PYTH_PRICE_FEED_IDS,
  PYTH_ABI,
} from "@/lib/constants/pyth";
import { appConfig } from "@/lib/config/app";

interface PythPrice {
  price: bigint;
  conf: bigint;
  expo: number;
  publishTime: bigint;
}

export function usePythPrices() {
  const { data, isLoading, isError } = useReadContracts({
    contracts: [
      {
        address: PYTH_CONTRACT_ADDRESS as `0x${string}`,
        abi: PYTH_ABI,
        functionName: "getPriceUnsafe",
        args: [PYTH_PRICE_FEED_IDS.ETH_USD as `0x${string}`],
      },
      {
        address: PYTH_CONTRACT_ADDRESS as `0x${string}`,
        abi: PYTH_ABI,
        functionName: "getPriceUnsafe",
        args: [PYTH_PRICE_FEED_IDS.SOL_USD as `0x${string}`],
      },
    ],
    query: {
      refetchInterval: 30000,
      staleTime: 25000,
    },
  });

  // Default fallback prices
  let ethPrice = 2000;
  let solPrice = 100;

  if (data && !isError) {
    try {
      // Parse ETH price
      const ethData = data[0];
      if (ethData.status === "success" && ethData.result) {
        const ethPriceData = ethData.result as PythPrice;
        // Pyth returns price with exponent (e.g., price * 10^expo)
        // expo is typically negative (e.g., -8 means divide by 10^8)
        ethPrice = Number(ethPriceData.price) * Math.pow(10, ethPriceData.expo);
      }

      // Parse SOL price
      const solData = data[1];
      if (solData.status === "success" && solData.result) {
        const solPriceData = solData.result as PythPrice;
        solPrice = Number(solPriceData.price) * Math.pow(10, solPriceData.expo);
      }
    } catch (error) {
      if (appConfig.isDevelopment) {
        console.error("Error parsing Pyth prices:", error);
      }
    }
  }

  return {
    ethPrice,
    solPrice,
    isLoading,
    isError,
  };
}
