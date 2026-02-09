"use client";

import { memo } from "react";
import { createPortal } from "react-dom";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import TerminalHeader from "@/components/TerminalHeader";
import Ethereum from "@/components/icons/Ethereum";
import Solana from "@/components/icons/Solana";

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ConnectWalletModal({ isOpen, onClose }: ConnectWalletModalProps) {
  const { openConnectModal } = useConnectModal();
  const { setVisible: setSolanaModalVisible } = useWalletModal();

  const handleEVMConnect = () => {
    if (openConnectModal) {
      openConnectModal();
    }
    onClose();
  };

  const handleSolanaConnect = () => {
    setSolanaModalVisible(true);
    onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl w-full max-w-md my-auto">
        <TerminalHeader title="Connect Wallet" onClose={onClose} />

        <div className="p-6 space-y-4">
          <div className="text-center mb-4">
            <p className="text-zinc-400 text-sm">
              Choose your preferred blockchain network
            </p>
          </div>

          <button
            onClick={handleEVMConnect}
            className="w-full bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg p-6 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="bg-zinc-900 p-3 rounded-lg group-hover:bg-zinc-800 transition-colors">
                <Ethereum size={32} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-zinc-100 font-semibold mb-1 text-lg">
                  EVM Wallets
                </div>
                <div className="text-zinc-500 text-sm">
                  MetaMask, WalletConnect, Coinbase & more
                </div>
              </div>
              <div className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </div>
          </button>

          <button
            onClick={handleSolanaConnect}
            className="w-full bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg p-6 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="bg-zinc-900 p-3 rounded-lg group-hover:bg-zinc-800 transition-colors">
                <Solana size={32} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-zinc-100 font-semibold mb-1 text-lg">
                  Solana Wallets
                </div>
                <div className="text-zinc-500 text-sm">
                  Phantom, Solflare, Torus & more
                </div>
              </div>
              <div className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default memo(ConnectWalletModal);
