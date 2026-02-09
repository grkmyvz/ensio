import Bitcoin from "@/components/icons/Bitcoin";
import Ethereum from "@/components/icons/Ethereum";
import Solana from "@/components/icons/Solana";
import { ChainName } from "@/lib/types/chains";

export const CHAIN_CONFIG: Record<
  string,
  {
    icon: typeof Bitcoin;
    color: string;
    name: ChainName;
  }
> = {
  bitcoin: {
    icon: Bitcoin,
    color: "text-yellow-500",
    name: "Bitcoin",
  },
  ethereum: {
    icon: Ethereum,
    color: "text-zinc-400",
    name: "Ethereum",
  },
  solana: {
    icon: Solana,
    color: "text-purple-500",
    name: "Solana",
  },
};
