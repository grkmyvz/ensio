# Ensio

**Bridge your ENS identity with crypto donations**

Ensio is a Web3-native donation platform that connects ENS (Ethereum Name Service) profiles with crypto donations across multiple blockchains. No platform fees, no signup required—just direct wallet-to-wallet transfers.

## Features

- 🎯 **ENS Integration** - Leverage your existing ENS profile and identity
- 💸 **Zero Platform Fees** - Direct wallet-to-wallet transfers
- 🔗 **Multi-Chain Support** - Ethereum, Solana, and Bitcoin
- 🪙 **Multiple Tokens** - ETH, SOL, USDC, USDT
- 🔒 **Privacy Focused** - No email, no signup, no tracking
- ⚡ **Quick Donate** - Pre-set amounts for fast donations
- 💱 **Real-time Pricing** - Powered by Pyth Network oracles

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Ethereum:** wagmi, viem, RainbowKit
- **Solana:** @solana/web3.js, Wallet Adapter
- **State Management:** TanStack Query
- **Price Feeds:** Pyth Network

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ensio.git
cd ensio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

4. Get your WalletConnect Project ID:
   - Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Create a project and get your Project ID
   - Add it to `.env.local` as `NEXT_PUBLIC_RAINBOW_KIT_PROJECT_ID`

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Usage

### For Content Creators

1. Set up your ENS profile at [app.ens.domains](https://app.ens.domains)
2. Add your wallet addresses (ETH, BTC, SOL)
3. Share your link: `ensio.app/yourname.eth`
4. Receive donations directly to your wallets

### For Donors

1. Visit someone's profile: `ensio.app/vitalik.eth`
2. Connect your wallet (EVM or Solana)
3. Choose amount and token
4. Send donation directly on-chain

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page with routing logic
│   └── providers.tsx      # Web3 providers setup
├── components/            # React components
├── lib/
│   ├── config/           # Configuration files
│   ├── constants/        # Constants and ABIs
│   ├── hooks/            # Custom React hooks
│   ├── services/         # Business logic
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
└── public/               # Static assets
```

## Key Features Explained

### ENS Resolution

Fetches ENS profile data including:

- Bio, avatar, email, website, location
- Social links (X/Twitter, Telegram, Discord, GitHub)
- Multi-chain addresses (ETH, BTC, SOL)

### Multi-Chain Donations

- **Ethereum**: ETH, USDC, USDT via wagmi
- **Solana**: SOL, USDC, USDT via Solana Web3.js
- **Bitcoin**: Display address for manual transfer

### Real-Time Pricing

Uses Pyth Network price feeds for accurate USD to crypto conversions.

## Build & Deploy

Build for production:

```bash
npm run build
npm run start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ensio)

### Deploy to Cloudflare Pages

The project includes a `public/_redirects` file for Cloudflare Pages deployment.

## Environment Variables

See `.env.example` for all available configuration options.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [ENS](https://ens.domains/) for decentralized naming
- [RainbowKit](https://www.rainbowkit.com/) for wallet connection
- [Solana](https://solana.com/) for fast transactions
- [Pyth Network](https://pyth.network/) for price feeds
