export function convertIpfsToHttp(
  url: string,
  gateway: string = "https://cloudflare-ipfs.com",
): string {
  if (!url) return url;

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("ipfs://")) {
    const hash = url.replace("ipfs://", "").replace("ipfs/", "");
    return `${gateway}/ipfs/${hash}`;
  }

  if (url.startsWith("ipns://")) {
    const hash = url.replace("ipns://", "");
    return `${gateway}/ipns/${hash}`;
  }

  if (url.startsWith("Qm") || url.startsWith("bafy")) {
    return `${gateway}/ipfs/${url}`;
  }

  return url;
}
