import { getCoderByCoinType } from "@ensdomains/address-encoder";
import { hexToBytes } from "@ensdomains/address-encoder/utils";
import { Hex } from "viem";

export function convertHexToAddr(
  coinType: number,
  hex: Hex,
): string | undefined {
  if (hex === "0x") return undefined;

  const coder = getCoderByCoinType(coinType);
  const bytes = Buffer.from(hexToBytes(hex));
  const addr = coder.encode(bytes);

  return addr;
}
