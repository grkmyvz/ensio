"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CustomConnectButton from "@/components/CustomConnectButton";

export default function Navbar() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = searchValue.trim();

    if (!trimmedValue) return;

    const ensName = trimmedValue.toLowerCase();

    const ethIndex = ensName.indexOf(".eth");

    if (ethIndex === -1) {
      setHasError(true);
      return;
    }

    const cleanName = ensName.substring(0, ethIndex + 4);

    setHasError(false);
    router.push(`/?ens=${cleanName}`);
    setSearchValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (hasError) setHasError(false);
  };

  return (
    <nav className="w-full border-b border-zinc-800 bg-zinc-900 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex justify-between items-center h-16 gap-6">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0"
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
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Search ENS (e.g., vitalik.eth)"
                className={`w-full bg-zinc-950 border text-zinc-300 text-sm rounded px-4 py-2 pr-10 focus:outline-none transition-colors placeholder:text-zinc-600 ${
                  hasError
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-800 focus:border-emerald-500"
                }`}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-emerald-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>

          <div className="flex-shrink-0">
            <CustomConnectButton />
          </div>
        </div>
        <div className="flex md:hidden flex-col py-3 gap-3">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity justify-center"
          >
            <Image
              src="/android-chrome-192x192.png"
              alt="Ensio Logo"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <h1 className="text-lg font-bold font-mono text-white">Ensio</h1>
          </Link>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Search ENS"
                className={`w-full bg-zinc-950 border text-zinc-300 text-sm rounded px-4 py-2 pr-10 focus:outline-none transition-colors placeholder:text-zinc-600 ${
                  hasError
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-800 focus:border-emerald-500"
                }`}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-emerald-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <CustomConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
