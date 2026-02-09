import { Address, Hex } from "viem";
import { MulticallResult } from "@/lib/types";
import { convertHexToAddr } from "./address";
import {
  BITCOIN_COIN_TYPE,
  SOLANA_COIN_TYPE,
} from "@/lib/constants/coin-types";

export function okStr(r: MulticallResult<string>): string | undefined {
  return r.status === "success" && r.result !== "" ? r.result : undefined;
}

export function okEthAddr(r: MulticallResult<string>): Address | undefined {
  return r.status === "success" && r.result !== "0x"
    ? (r.result as Address)
    : undefined;
}

export function okBtcAddr(r: MulticallResult<string>): string | undefined {
  return r.status === "success" && r.result !== "0x"
    ? convertHexToAddr(Number(BITCOIN_COIN_TYPE), r.result as Hex)
    : undefined;
}

export function okSolAddr(r: MulticallResult<string>): string | undefined {
  return r.status === "success" && r.result !== "0x"
    ? convertHexToAddr(Number(SOLANA_COIN_TYPE), r.result as Hex)
    : undefined;
}
