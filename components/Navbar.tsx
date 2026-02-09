"use client";

import Link from "next/link";
import Image from "next/image";
import CustomConnectButton from "@/components/CustomConnectButton";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-zinc-800 bg-zinc-900 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/android-chrome-192x192.png"
              alt="Ensio Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <h1 className="text-xl font-bold font-mono text-white">Ensio</h1>
          </Link>
          <CustomConnectButton />
        </div>
      </div>
    </nav>
  );
}
