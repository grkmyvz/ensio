/**
 * Validates if a string is a valid ENS name format
 * @param name - The ENS name to validate
 * @returns true if valid, false otherwise
 */
export function isValidENSName(name: string): boolean {
  if (!name || typeof name !== "string") return false;

  // Must end with .eth
  if (!name.endsWith(".eth")) return false;

  // Remove .eth suffix for validation
  const label = name.slice(0, -4);

  // Check length (1-253 characters without .eth)
  if (label.length < 1 || label.length > 253) return false;

  // ENS names can only contain lowercase letters, numbers, and hyphens
  // Cannot start or end with hyphen
  const validPattern = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;

  return validPattern.test(label);
}

/**
 * Sanitizes an ENS name by converting to lowercase and trimming
 * @param name - The ENS name to sanitize
 * @returns Sanitized ENS name
 */
export function sanitizeENSName(name: string): string {
  return (name ?? "").toLowerCase().trim().replace(/\/+$/, "");
}
