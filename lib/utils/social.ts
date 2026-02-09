import { ISocialLink } from "@/lib/types";

export function normalizeSocialLinks(
  x?: string,
  twitter?: string,
  telegram?: string,
  discord?: string,
  github?: string,
): ISocialLink[] {
  const links: ISocialLink[] = [];

  const xHandle = x || twitter;
  if (xHandle) {
    links.push({ name: "X", handle: xHandle });
  }

  if (telegram) {
    links.push({ name: "Telegram", handle: telegram });
  }

  if (discord) {
    links.push({ name: "Discord", handle: discord });
  }

  if (github) {
    links.push({ name: "Github", handle: github });
  }

  return links;
}
