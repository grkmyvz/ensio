"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Copy from "@/components/icons/Copy";
import Alert from "@/components/Alert";
import TerminalHeader from "@/components/TerminalHeader";
import { IWalletInfo } from "@/lib/types";
import { useTokenCalculation } from "@/lib/hooks/useTokenCalculation";
import { useSendDonation } from "@/lib/hooks/useSendDonation";
import { useSendSolanaDonation } from "@/lib/hooks/useSendSolanaDonation";
import { useCopyToClipboard } from "@/lib/hooks/useCopyToClipboard";
import {
  QUICK_DONATION_AMOUNTS,
  NETWORK_TOKENS,
} from "@/lib/constants/donation";
import { TokenName } from "@/lib/types/chains";
import { appConfig } from "@/lib/config/app";

interface DonateModalProps {
  wallet: IWalletInfo;
  isOpen: boolean;
  onClose: () => void;
}

export default function DonateModal({
  wallet,
  isOpen,
  onClose,
}: DonateModalProps) {
  const { calculateTokenAmount } = useTokenCalculation();
  const { isConnected: isEvmConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const {
    sendDonation: sendEvmDonation,
    isLoading: isEvmLoading,
    isSuccess: isEvmSuccess,
    isError: isEvmError,
    error: evmError,
    hash: evmHash,
    reset: resetEvm,
  } = useSendDonation();

  // Solana wallet hooks
  const { connected: isSolanaConnected } = useWallet();
  const { setVisible: setSolanaModalVisible } = useWalletModal();
  const {
    sendDonation: sendSolanaDonation,
    isLoading: isSolanaLoading,
    isSuccess: isSolanaSuccess,
    isError: isSolanaError,
    error: solanaError,
    signature: solanaSignature,
    reset: resetSolana,
  } = useSendSolanaDonation();

  const { copied, copy } = useCopyToClipboard();

  const tokens = NETWORK_TOKENS[wallet.chain.toLowerCase()] || [];
  const [selectedToken, setSelectedToken] = useState<TokenName>(
    (tokens[0] as TokenName) || "ETH",
  );
  const [customAmount, setCustomAmount] = useState("");
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const needsTokenSelect = tokens.length > 1;
  const isEthereum = wallet.chain.toLowerCase() === "ethereum";
  const isBitcoin = wallet.chain.toLowerCase() === "bitcoin";
  const isSolana = wallet.chain.toLowerCase() === "solana";

  // Determine which wallet is connected and relevant for this chain
  const isWalletConnected = isEthereum
    ? isEvmConnected
    : isSolana
      ? isSolanaConnected
      : false;
  const isLoading = isEvmLoading || isSolanaLoading;
  const isSuccess = isEvmSuccess || isSolanaSuccess;
  const isError = isEvmError || isSolanaError;
  const error = evmError || solanaError;
  const txHash = evmHash || solanaSignature;

  const handleClose = () => {
    resetEvm();
    resetSolana();
    setCustomAmount("");
    setWarningMessage(null);
    onClose();
  };

  const checkWalletConnection = () => {
    if (isEthereum && !isEvmConnected) {
      if (openConnectModal) openConnectModal();
      return false;
    }
    if (isSolana && !isSolanaConnected) {
      setSolanaModalVisible(true);
      return false;
    }
    return true;
  };

  const sendDonationByChain = async (amount: string) => {
    try {
      if (isEthereum) {
        await sendEvmDonation({
          to: wallet.address,
          amount,
          token: selectedToken,
        });
      } else if (isSolana) {
        await sendSolanaDonation({
          to: wallet.address,
          amount,
          token: selectedToken,
        });
      }
    } catch (err) {
      if (appConfig.isDevelopment) {
        console.error("Donation error:", err);
      }
    }
  };

  const handleQuickDonate = async (amount: number) => {
    if (!checkWalletConnection()) return;
    const tokenAmount = calculateTokenAmount(amount, selectedToken);
    await sendDonationByChain(tokenAmount);
  };

  const handleCustomDonate = async () => {
    if (!customAmount || parseFloat(customAmount) <= 0) return;
    if (!checkWalletConnection()) return;
    await sendDonationByChain(customAmount);
  };

  const getExplorerLink = () => {
    if (!txHash) return "";
    if (isEthereum) {
      return `https://etherscan.io/tx/${txHash}`;
    }
    if (isSolana) {
      return `https://solscan.io/tx/${txHash}`;
    }
    return "";
  };

  const reset = () => {
    resetEvm();
    resetSolana();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl w-full max-w-md">
        <TerminalHeader
          title={`Donate via ${wallet.chain}`}
          onClose={handleClose}
        />

        <div className="p-6 font-mono text-sm space-y-6">
          <div>
            <label className="text-zinc-400 text-xs font-semibold mb-2 block">
              Wallet Address
            </label>
            <div
              className={`${copied ? "bg-emerald-950" : "bg-zinc-950 hover:bg-zinc-900"} border ${copied ? "border-emerald-800" : "border-zinc-800 hover:border-zinc-700"} rounded p-3 flex items-center justify-between group cursor-pointer`}
              onClick={() => copy(wallet.address)}
            >
              <span className="text-xs break-all font-mono">
                {wallet.address}
              </span>
              <Copy size={14} />
            </div>
          </div>

          {/* Bitcoin: Only show info message */}
          {isBitcoin && (
            <Alert
              type="warning"
              title="Browser Limitation"
              message="Bitcoin donations cannot be sent directly from the browser. Please use your Bitcoin wallet app to send to the address above."
            />
          )}

          {/* Ethereum & Solana: Show full donation UI */}
          {(isEthereum || isSolana) && (
            <>
              {needsTokenSelect && (
                <div>
                  <label className="text-zinc-400 text-xs font-semibold mb-2 block">
                    Select Token
                  </label>
                  <select
                    value={selectedToken}
                    onChange={(e) =>
                      setSelectedToken(e.target.value as TokenName)
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-zinc-300 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                  >
                    {tokens.map((token) => (
                      <option key={token} value={token}>
                        {token}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="text-zinc-400 text-xs font-semibold mb-2 block">
                  Quick Amounts
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {QUICK_DONATION_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleQuickDonate(amount)}
                      disabled={isLoading}
                      className="bg-zinc-950 hover:bg-emerald-950 border border-zinc-800 hover:border-emerald-500 rounded p-3 text-zinc-300 hover:text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-950 disabled:hover:border-zinc-800"
                    >
                      <div className="mb-1">${amount}</div>
                      <div className="text-[10px] text-emerald-400">
                        ~{calculateTokenAmount(amount, selectedToken)}
                      </div>
                      <div className="text-[9px] text-zinc-500 mt-0.5">
                        {selectedToken}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-zinc-400 text-xs font-semibold mb-2 block">
                  Or Enter Amount
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-zinc-300 text-sm focus:outline-none focus:border-emerald-400 transition-colors pr-16"
                      disabled={isLoading}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 text-xs font-semibold">
                      {selectedToken}
                    </span>
                  </div>
                </div>
              </div>

              {/* Warning Message */}
              {warningMessage && (
                <Alert
                  type="warning"
                  title="Warning"
                  message={warningMessage}
                  onClose={() => setWarningMessage(null)}
                />
              )}

              {/* Success Message */}
              {isSuccess && txHash && (
                <Alert
                  type="success"
                  title="Donation Successful!"
                  message="Your transaction has been confirmed on the blockchain."
                  link={{
                    href: getExplorerLink(),
                    text: `View on ${isEthereum ? "Etherscan" : "Solscan"} →`,
                  }}
                />
              )}

              {/* Error Message */}
              {isError && error && (
                <Alert
                  type="error"
                  title="Transaction Failed"
                  message={
                    error.message.length > 150
                      ? `${error.message.substring(0, 150)}...`
                      : error.message
                  }
                  onClose={reset}
                />
              )}

              <div className="pt-4 border-t border-zinc-800">
                <button
                  onClick={() => {
                    if (!isWalletConnected) {
                      if (isEthereum && openConnectModal) {
                        openConnectModal();
                      } else if (isSolana) {
                        setSolanaModalVisible(true);
                      }
                    } else {
                      handleCustomDonate();
                    }
                  }}
                  disabled={
                    isWalletConnected &&
                    (!customAmount ||
                      parseFloat(customAmount) <= 0 ||
                      isLoading)
                  }
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-semibold py-3 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {!isWalletConnected
                    ? "Connect Wallet"
                    : isLoading
                      ? "Processing..."
                      : `Donate ${customAmount || ""} ${customAmount ? selectedToken : ""}`}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
