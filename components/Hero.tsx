import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-zinc-950 pt-8">
      <div className="max-w-5xl px-6 w-full">
        <div className="text-center mb-12">
          <div className="inline-block bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full mb-2">
            <span className="text-emerald-400 text-xs font-mono">
              Web3 Native
            </span>
          </div>
          <h1 className="text-4xl font-bold text-zinc-100 mb-2 font-mono">
            Ensio
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Bridging ENS identities with crypto donations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="text-zinc-100 font-semibold mb-4">Why Ensio?</div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-900/20 text-emerald-400 text-xs font-mono px-2 py-1 rounded mt-0.5">
                  01
                </div>
                <div className="flex-1">
                  <div className="text-zinc-300 text-sm font-medium mb-1">
                    No Platform Fees
                  </div>
                  <div className="text-zinc-500 text-xs">
                    Direct wallet-to-wallet transfers. Keep 100% of donations.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-emerald-900/20 text-emerald-400 text-xs font-mono px-2 py-1 rounded mt-0.5">
                  02
                </div>
                <div className="flex-1">
                  <div className="text-zinc-300 text-sm font-medium mb-1">
                    ENS Integration
                  </div>
                  <div className="text-zinc-500 text-xs">
                    Leverage your existing ENS identity and profile data.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-emerald-900/20 text-emerald-400 text-xs font-mono px-2 py-1 rounded mt-0.5">
                  03
                </div>
                <div className="flex-1">
                  <div className="text-zinc-300 text-sm font-medium mb-1">
                    Privacy Focused
                  </div>
                  <div className="text-zinc-500 text-xs">
                    No email, no signup, no tracking. Just your wallet.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="text-zinc-100 font-semibold mb-4">
              Getting Started
            </div>
            <div className="space-y-3">
              <div className="bg-zinc-950 border border-zinc-800 rounded p-3">
                <div className="text-xs text-zinc-500 mb-1">
                  1. Set up ENS Profile
                </div>
                <div className="text-zinc-300 text-xs">
                  Configure your addresses at{" "}
                  <a
                    href="https://app.ens.domains"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    app.ens.domains
                  </a>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded p-3">
                <div className="text-xs text-zinc-500 mb-1">
                  2. Share Your Link
                </div>
                <div className="text-zinc-300 text-xs">
                  Give people{" "}
                  <span className="text-emerald-400">
                    ensio.pages.dev/ens/yourname.eth
                  </span>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 rounded p-3">
                <div className="text-xs text-zinc-500 mb-1">
                  3. Receive Donations
                </div>
                <div className="text-zinc-300 text-xs">
                  Direct to your wallets on ETH, BTC, SOL and more
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-zinc-100 font-semibold mb-1">Try it now</div>
              <div className="text-zinc-500 text-xs">
                Check out an example donation profile
              </div>
            </div>
            <Link
              href="/ens/vitalik.eth"
              className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-4 py-3 rounded hover:border-zinc-700 transition-colors cursor-pointer"
            >
              <span className="text-zinc-600 text-sm font-mono">
                ensio.pages.dev/ens/
              </span>
              <span className="text-emerald-400 font-mono">vitalik.eth</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
