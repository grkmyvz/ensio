import { getEnsResolver, multicall } from "@wagmi/core";
import { normalize } from "viem/ens";
import { namehash } from "viem";
import { wagmiConfig } from "@/lib/config/wagmi";
import { ENS_RESOLVER_ABI } from "@/lib/constants/ens";
import {
  BITCOIN_COIN_TYPE,
  ETHEREUM_COIN_TYPE,
  SOLANA_COIN_TYPE,
} from "@/lib/constants/coin-types";
import { okBtcAddr, okEthAddr, okSolAddr, okStr } from "@/lib/utils/result";
import { normalizeSocialLinks } from "@/lib/utils/social";
import { IENSProfile } from "@/lib/types";

export async function ensResolver(name: string): Promise<IENSProfile> {
  const normalizedName = normalize(name);
  const node = namehash(normalizedName);

  const resolverAddress = await getEnsResolver(wagmiConfig, {
    name: normalizedName,
  });

  if (!resolverAddress) {
    throw new Error(`No resolver found for ENS name: ${name}`);
  }

  const resolverConfig = {
    address: resolverAddress,
    abi: ENS_RESOLVER_ABI,
  } as const;

  const [
    ethAddr,
    bio,
    email,
    url,
    location,
    avatar,
    x,
    twitter,
    telegram,
    discord,
    github,
    btcAddr,
    solAddr,
  ] = await multicall(wagmiConfig, {
    contracts: [
      {
        ...resolverConfig,
        functionName: "addr",
        args: [node, ETHEREUM_COIN_TYPE],
      },
      {
        ...resolverConfig,
        functionName: "text",
        args: [node, "description"],
      },
      {
        ...resolverConfig,
        functionName: "text",
        args: [node, "email"],
      },
      {
        ...resolverConfig,
        functionName: "text",
        args: [node, "url"],
      },
      {
        ...resolverConfig,
        functionName: "text",
        args: [node, "location"],
      },
      {
        ...resolverConfig,
        functionName: "text",
        args: [node, "avatar"],
      },
      {
        ...resolverConfig,
        functionName: "text",
        args: [node, "com.x"],
      },
      {
        ...resolverConfig,
        functionName: "text",
        args: [node, "com.twitter"],
      },
      {
        ...resolverConfig,
        functionName: "text",
        args: [node, "org.telegram"],
      },
      {
        ...resolverConfig,
        functionName: "text",
        args: [node, "com.discord"],
      },
      {
        ...resolverConfig,
        functionName: "text",
        args: [node, "com.github"],
      },
      {
        ...resolverConfig,
        functionName: "addr",
        args: [node, BITCOIN_COIN_TYPE],
      },
      {
        ...resolverConfig,
        functionName: "addr",
        args: [node, SOLANA_COIN_TYPE],
      },
    ],
    allowFailure: true,
  });

  const ethAddrStr = okEthAddr(ethAddr);
  const bioStr = okStr(bio);
  const emailStr = okStr(email);
  const urlStr = okStr(url);
  const locationStr = okStr(location);
  const avatarStr = okStr(avatar);
  const xStr = okStr(x);
  const twitterStr = okStr(twitter);
  const telegramStr = okStr(telegram);
  const discordStr = okStr(discord);
  const githubStr = okStr(github);
  const btcAddrStr = okBtcAddr(btcAddr);
  const solAddrStr = okSolAddr(solAddr);

  const socialLinks = normalizeSocialLinks(
    xStr,
    twitterStr,
    telegramStr,
    discordStr,
    githubStr,
  );

  const ensProfile: IENSProfile = {
    profile: {
      name: normalizedName,
      address: ethAddrStr || "",
      bio: bioStr,
      mail: emailStr,
      website: urlStr,
      location: locationStr,
      avatar: avatarStr,
    },
    socials: socialLinks.length > 0 ? socialLinks : undefined,
    wallets: [
      ...(btcAddrStr ? [{ chain: "Bitcoin", address: btcAddrStr }] : []),
      ...(ethAddrStr ? [{ chain: "Ethereum", address: ethAddrStr }] : []),
      ...(solAddrStr ? [{ chain: "Solana", address: solAddrStr }] : []),
    ],
  };

  return ensProfile;
}
