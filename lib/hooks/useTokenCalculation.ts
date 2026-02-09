import { useMemo } from "react";
import { usePythPrices } from "@/lib/hooks/usePythPrices";
import { TokenName } from "@/lib/types/chains";

export function useTokenCalculation() {
  const { ethPrice, solPrice } = usePythPrices();

  const calculateTokenAmount = useMemo(
    () =>
      (usdAmount: number, token: TokenName): string => {
        const tokenPrice =
          token === "ETH" ? ethPrice : token === "SOL" ? solPrice : 1;
        const tokenAmount = usdAmount / tokenPrice;

        if (tokenAmount >= 1) return tokenAmount.toFixed(2);
        if (tokenAmount >= 0.01) return tokenAmount.toFixed(4);
        return tokenAmount.toFixed(6);
      },
    [ethPrice, solPrice],
  );

  return { calculateTokenAmount };
}
