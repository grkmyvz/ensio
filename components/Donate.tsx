"use client";

import { useState, memo } from "react";
import DonateModal from "./DonateModal";
import { IWalletInfo } from "@/lib/types";
import { CHAIN_CONFIG } from "@/lib/constants/chains";

function getChainConfig(chain: string) {
  const chainKey = chain.toLowerCase() as keyof typeof CHAIN_CONFIG;
  return CHAIN_CONFIG[chainKey];
}

function Donate({ wallets }: { wallets: IWalletInfo[] }) {
  const [selectedWallet, setSelectedWallet] = useState<IWalletInfo | null>(
    null,
  );

  return (
    <>
      <div className="mb-6">
        <div className="text-red-400 text-sm font-semibold mb-1 text-center">
          Donate
        </div>
        <span className="text-zinc-500 text-xs mb-3 block text-center">
          Choose your preferred donation method
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {wallets.map((wallet, idx) => {
            const config = getChainConfig(wallet.chain);
            const Icon = config?.icon;
            const color = config?.color ?? "text-white";

            return (
              <button
                key={idx}
                onClick={() => setSelectedWallet(wallet)}
                className="text-left p-4 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon size={32} />}
                  <div className="flex flex-col mb-1">
                    <div className={`${color} text-sm font-semibold mb-2`}>
                      {wallet.chain}
                    </div>
                    <div className="text-zinc-400 text-xs font-mono">
                      {wallet.address.slice(0, 8)}...{wallet.address.slice(-5)}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedWallet && (
        <DonateModal
          wallet={selectedWallet}
          isOpen={!!selectedWallet}
          onClose={() => setSelectedWallet(null)}
        />
      )}
    </>
  );
}

export default memo(Donate);
