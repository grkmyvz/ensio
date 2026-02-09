"use client";

import { useState, useEffect, memo } from "react";
import { useAccount } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import ConnectWalletModal from "@/components/ConnectWalletModal";

function CustomConnectButton() {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isConnected: isEvmConnected } = useAccount();
  const { connected: isSolanaConnected } = useWallet();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by showing placeholder during SSR
  if (!mounted) {
    return (
      <button className="bg-emerald-600 text-white font-semibold py-2 px-4 rounded border-0 h-10 opacity-0">
        Connect Wallet
      </button>
    );
  }

  if (isEvmConnected) {
    return <ConnectButton showBalance={false} />;
  }

  if (isSolanaConnected) {
    return (
      <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-500 !text-white !font-semibold !py-2 !px-4 !rounded !transition-colors !border-0 !h-10" />
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded transition-colors cursor-pointer border-0 h-10"
      >
        Connect Wallet
      </button>
      <ConnectWalletModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default memo(CustomConnectButton);
