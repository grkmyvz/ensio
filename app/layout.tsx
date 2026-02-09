import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ensio - ENS Based Crypto Donations",
  description:
    "Bridge your ENS identity with crypto donations. Direct wallet-to-wallet transfers with no platform fees.",
  keywords: [
    "ENS",
    "crypto donations",
    "Ethereum",
    "Solana",
    "Bitcoin",
    "Web3",
    "blockchain",
  ],
  authors: [{ name: "Ensio Team" }],
  creator: "Ensio",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ensio.app",
    title: "Ensio - ENS-Based Crypto Donations",
    description:
      "Bridge your ENS identity with crypto donations. Direct wallet-to-wallet transfers with no platform fees.",
    siteName: "Ensio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ensio - ENS-Based Crypto Donations",
    description:
      "Bridge your ENS identity with crypto donations. Direct wallet-to-wallet transfers with no platform fees.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-y-scroll">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
