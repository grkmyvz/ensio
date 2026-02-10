# Ensio

**Bridge your ENS identity with crypto donations**

Ensio is a Web3-native donation platform that connects ENS (Ethereum Name Service) profiles with crypto donations across multiple blockchains. No platform fees, no signup required—just direct wallet-to-wallet transfers.

🔗 **Live Demo:** [ensio.pages.dev](https://ensio.pages.dev)

## Features

- 🎯 **ENS Integration** - Leverage your existing ENS profile and identity
- 💸 **Zero Platform Fees** - Direct wallet-to-wallet transfers, 100% goes to creators
- 🔗 **Multi-Chain Support** - Ethereum, Solana, and Bitcoin addresses
- 🪙 **Multiple Tokens** - ETH, SOL, USDC, USDT with real-time pricing
- 🔒 **Privacy Focused** - No email, no signup, no tracking, no database
- ⚡ **Quick Donate** - Pre-set amounts ($5, $10, $20, $50) for fast donations
- 💱 **Real-time Pricing** - Powered by Pyth Network oracles
- 🌐 **Static Export** - Fully static site, deploys anywhere

## Tech Stack

- **Framework:** Next.js 16.1.6 (Static Export)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS 4 + PostCSS
- **Ethereum:** wagmi 2.x, viem, RainbowKit 2.x
- **Solana:** @solana/web3.js, Wallet Adapter
- **State Management:** TanStack Query (React Query)
- **Price Feeds:** Pyth Network Oracle
- **ENS Resolution:** Native ENS contracts via viem
- **Deployment:** Cloudflare Pages (Static SPA)

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/grkmyvz/ensio.git
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

3. Create `.env.local` file:

```bash
cp .env.example .env.local
```

4. **Required:** Get your WalletConnect Project ID:
   - Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Create a new project
   - Copy your Project ID
   - Add to `.env.local`:
     ```
     NEXT_PUBLIC_RAINBOW_KIT_PROJECT_ID=your_project_id_here
     ```

   > ⚠️ **Note:** The project includes a fallback Project ID for testing, but you should use your own for production.

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

## How It Works

### URL Routing

Ensio uses a redirect-based routing system for ENS profiles:

```
https://ensio.pages.dev/ens/vitalik.eth
```

The routing flow:

1. User visits `/ens/vitalik.eth`
2. Cloudflare Pages redirects (302) to `/?ens=vitalik.eth` (via `_redirects` file)
3. Client-side JavaScript reads `ens` query parameter
4. Fetches ENS data from Ethereum mainnet
5. Displays profile with donation interface

### For Content Creators

1. **Set up ENS:** Get your ENS name at [app.ens.domains](https://app.ens.domains)
2. **Add Addresses:** Configure your wallet addresses in ENS records:
   - ETH (address)
   - BTC (BTC address)
   - SOL (SOL address)
3. **Add Profile:** Set avatar, bio, social links in ENS text records
4. **Share:** Your donation page is automatically at `ensio.pages.dev/ens/yourname.eth`
5. **Receive:** Donations go directly to your wallets, no intermediary

### For Donors

1. **Visit Profile:** Go to `ensio.pages.dev/ens/username.eth`
2. **Connect Wallet:** RainbowKit (EVM) or Solana Wallet Adapter
3. **Choose Amount:** Use quick donate or enter custom amount
4. **Select Token:** ETH, SOL, USDC, or USDT
5. **Send:** Transaction goes directly to creator's wallet on-chain

## Project Structure

```
ensio/
├── app/
│   ├── layout.tsx           # Root layout with metadata & fonts
│   ├── page.tsx             # Home page (reads ?ens= query param from redirect)
│   ├── providers.tsx        # Web3 providers (wagmi, Solana, RainbowKit)
│   ├── globals.css          # Tailwind base styles
│   └── sitemap.ts           # Static sitemap generator
├── components/
│   ├── Alert.tsx            # Error/success alerts
│   ├── CustomConnectButton  # Unified wallet connection UI
│   ├── Donate.tsx           # Main donation component
│   ├── DonateModal.tsx      # Token selection & amount input
│   ├── Hero.tsx             # Landing page
│   ├── Navbar.tsx           # Header with logo
│   ├── ProfileClient.tsx    # ENS profile loader
│   ├── ProfileHeader.tsx    # Avatar, bio, social links
│   └── icons/               # SVG icon components
├── lib/
│   ├── config/
│   │   ├── app.ts           # Centralized config (domain, RPCs, etc.)
│   │   └── wagmi.ts         # wagmi client configuration
│   ├── constants/
│   │   ├── chains.ts        # Supported blockchains
│   │   ├── tokens.ts        # ERC20 token configs (USDC, USDT)
│   │   ├── solana-tokens.ts # SPL token configs
│   │   ├── donation.ts      # Quick donate amounts
│   │   └── ens.ts           # ENS contract addresses
│   ├── hooks/
│   │   ├── useENSProfile.ts       # Fetch ENS data
│   │   ├── usePythPrices.ts       # Real-time price feeds
│   │   ├── useSendDonation.ts     # EVM donation logic
│   │   ├── useSendSolanaDonation  # Solana donation logic
│   │   └── useTokenCalculation    # USD ↔ crypto conversion
│   ├── services/
│   │   └── ens.service.ts   # ENS resolution & profile parsing
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   └── utils/
│       ├── address.ts       # Address formatting & validation
│       ├── validation.ts    # ENS name validation
│       └── social.ts        # Social link parsing
├── public/
│   ├── _redirects           # Cloudflare Pages SPA routing
│   ├── robots.txt           # SEO
│   └── *.png                # Favicon assets
└── next.config.ts           # Static export config
```

## Key Technical Details

### ENS Resolution

The app fetches ENS data directly from Ethereum mainnet:

- **Resolver:** `eth_call` to ENS registry → get resolver contract
- **Text Records:** Fetch `description`, `avatar`, `email`, `url`, `location`, social handles
- **Addresses:** Fetch multi-chain addresses via `addr(coinType)` (EVM, BTC, SOL)
- **Caching:** TanStack Query caches results client-side

### Multi-Chain Donations

- **Ethereum (EVM):**
  - Native ETH: `eth_sendTransaction`
  - USDC/USDT: ERC20 `transfer()` via wagmi
  - Gas estimation & approval flow
- **Solana:**
  - Native SOL: `SystemProgram.transfer()`
  - SPL Tokens (USDC/USDT): Token Program transfer
  - Wallet Adapter integration
- **Bitcoin:**
  - Displays BTC address for manual wallet transfer
  - No on-chain integration (receive-only)

### Price Feeds

- **Pyth Network:** Real-time oracle prices for ETH/USD and SOL/USD
- **Conversion:** Calculates token amounts based on user's USD input
- **Fallback:** Uses last known price if oracle unavailable

### Static Export & SPA Routing

- **Build:** `next build` generates static HTML/JS/CSS in `out/`
- **Routing:** `public/_redirects` tells Cloudflare to:
  - Redirect `/ens/:name` → `/?ens=:name` (302)
  - Serve `index.html` for all other paths (200)
- **Client-Side:** `useSearchParams()` reads `?ens=` query parameter
- **No SSR:** All ENS data fetched client-side (no build-time generation needed)

## Build & Deploy

### Local Build

```bash
npm run build
```

This generates a static export in the `out/` directory.

### Deploy to Cloudflare Pages

**Recommended deployment platform** (project is optimized for Cloudflare):

1. **Via Git Integration:**
   - Connect your GitHub repo to Cloudflare Pages
   - Build command: `npm run build`
   - Build output directory: `out`
   - Cloudflare will auto-deploy on push

2. **Via Wrangler CLI:**

   ```bash
   npm run build
   npx wrangler pages deploy out
   ```

3. **Environment Variables:**
   Set in Cloudflare Pages dashboard:
   - `NEXT_PUBLIC_RAINBOW_KIT_PROJECT_ID` (required)
   - `NEXT_PUBLIC_MAINNET_RPC_URL` (optional)
   - `NEXT_PUBLIC_SOLANA_RPC_URL` (optional)

**Important:** The `public/_redirects` file is automatically included in the build and enables SPA routing.

### Deploy to Other Platforms

The static export works on any platform:

- **Vercel:** Supports Next.js static export natively
- **Netlify:** Include `_redirects` file
- **GitHub Pages:** Configure 404.html → index.html
- **AWS S3/CloudFront:** Configure routing rules

## Environment Variables

| Variable                             | Required | Default                               | Description                                           |
| ------------------------------------ | -------- | ------------------------------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_RAINBOW_KIT_PROJECT_ID` | Yes\*    | Fallback provided                     | WalletConnect Project ID from cloud.walletconnect.com |
| `NEXT_PUBLIC_MAINNET_RPC_URL`        | No       | `https://eth.drpc.org`                | Ethereum RPC endpoint                                 |
| `NEXT_PUBLIC_SOLANA_RPC_URL`         | No       | `https://api.mainnet-beta.solana.com` | Solana RPC endpoint                                   |
| `NEXT_PUBLIC_SOLANA_NETWORK`         | No       | `mainnet-beta`                        | Solana network (mainnet-beta/devnet)                  |
| `NEXT_PUBLIC_IPFS_GATEWAY`           | No       | `https://cloudflare-ipfs.com`         | IPFS gateway for ENS avatars                          |

\* A fallback ID is included for development, but you should use your own in production.

All variables must be prefixed with `NEXT_PUBLIC_` to be available client-side (required for static export).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Example URLs

- Landing page: `ensio.pages.dev`
- ENS profile: `ensio.pages.dev/ens/vitalik.eth`
- Another profile: `ensio.pages.dev/ens/nick.eth`

## Security Considerations

- ✅ No backend or database
- ✅ All transactions signed by user's wallet
- ✅ Direct peer-to-peer transfers (no custody)
- ✅ Open source and auditable
- ⚠️ Always verify recipient address before sending
- ⚠️ ENS data is pulled from mainnet (trust ENS security model)

## Acknowledgments

- [ENS](https://ens.domains/) - Decentralized naming system
- [RainbowKit](https://www.rainbowkit.com/) - Beautiful wallet connection UX
- [Solana](https://solana.com/) - Fast & cheap transactions
- [Pyth Network](https://pyth.network/) - Real-time price oracles
- [wagmi](https://wagmi.sh/) - React hooks for Ethereum
- [Cloudflare Pages](https://pages.cloudflare.com/) - Hosting & CDN
