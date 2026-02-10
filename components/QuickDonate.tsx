"use client";

import { useState, useCallback, useMemo, memo } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";
import Alert from "@/components/Alert";
import { IWalletInfo } from "@/lib/types";
import { useTokenCalculation } from "@/lib/hooks/useTokenCalculation";
import { useSendDonation } from "@/lib/hooks/useSendDonation";
import { QUICK_DONATION_AMOUNTS } from "@/lib/constants/donation";

interface QuickDonateProps {
  wallets: IWalletInfo[];
}

function QuickDonate({ wallets }: QuickDonateProps) {
  const { isConnected, chain } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const { calculateTokenAmount } = useTokenCalculation();
  const { sendDonation, isLoading, isSuccess, isError, error, hash, reset } =
    useSendDonation();

  const [clickedAmount, setClickedAmount] = useState<number | null>(null);
  const [switchError, setSwitchError] = useState<string | null>(null);

  // Find Ethereum wallet - memoized to prevent recalculation
  const ethWallet = useMemo(
    () => wallets.find((w) => w.chain.toLowerCase() === "ethereum"),
    [wallets],
  );

  const handleQuickDonate = useCallback(
    async (amount: number) => {
      if (!ethWallet) return;

      // Reset previous states
      if (isSuccess || isError) {
        reset();
      }
      setSwitchError(null);

      setClickedAmount(amount);

      if (!isConnected && openConnectModal) {
        openConnectModal();
        return;
      }

      // Check if on Ethereum mainnet
      if (chain?.id !== mainnet.id) {
        try {
          await switchChain({ chainId: mainnet.id });
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to switch to Ethereum mainnet";
          setSwitchError(errorMessage);
          return;
        }
      }

      const ethAmount = calculateTokenAmount(amount, "ETH");
      await sendDonation({
        to: ethWallet.address as `0x${string}`,
        amount: ethAmount,
        token: "ETH",
      });
    },
    [
      ethWallet,
      isSuccess,
      isError,
      reset,
      isConnected,
      openConnectModal,
      chain?.id,
      switchChain,
      calculateTokenAmount,
      sendDonation,
    ],
  );

  // Don't render if no Ethereum wallet
  if (!ethWallet) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs text-zinc-400 font-semibold">
          QUICK DONATE
        </span>
        <span className="font-mono text-[10px] text-zinc-600">
          Ethereum Network - ETH Only
        </span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {QUICK_DONATION_AMOUNTS.map((amount) => (
            <button
              key={amount}
              onClick={() => handleQuickDonate(amount)}
              disabled={isLoading || isSwitching}
              className="bg-zinc-950 hover:bg-emerald-950 border border-zinc-800 hover:border-emerald-500 rounded p-2.5 text-zinc-300 hover:text-white text-sm font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-950 disabled:hover:border-zinc-800"
            >
              <div className="mb-0.5 text-sm">${amount}</div>
              <div className="text-[10px] text-emerald-400">
                ~{calculateTokenAmount(amount, "ETH")}
              </div>
              <div className="text-[9px] text-zinc-500 mt-0.5">ETH</div>
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {(isLoading || isSwitching) && (
          <div className="flex items-center justify-center gap-2 p-3 bg-zinc-950 border border-zinc-800 rounded">
            <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-zinc-400 font-mono">
              {isSwitching
                ? "Switching to Ethereum..."
                : "Processing transaction..."}
            </span>
          </div>
        )}

        {/* Network Switch Error */}
        {switchError && (
          <Alert
            type="error"
            title="Network Switch Failed"
            message={switchError}
            onClose={() => {
              setSwitchError(null);
              setClickedAmount(null);
            }}
          />
        )}

        {/* Success Message */}
        {isSuccess && hash && clickedAmount && (
          <Alert
            type="success"
            title={`$${clickedAmount} Donation Successful!`}
            message="Your transaction has been confirmed on the blockchain."
            link={{
              href: `https://etherscan.io/tx/${hash}`,
              text: "View on Etherscan →",
            }}
            onClose={() => {
              reset();
              setClickedAmount(null);
            }}
          />
        )}

        {/* Error Message */}
        {isError && error && (
          <Alert
            type="error"
            title="Transaction Failed"
            message={
              error.message.length > 100
                ? `${error.message.substring(0, 100)}...`
                : error.message
            }
            onClose={() => {
              reset();
              setClickedAmount(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default memo(QuickDonate);
