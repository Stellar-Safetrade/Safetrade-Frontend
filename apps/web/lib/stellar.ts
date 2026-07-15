const STROOPS_PER_UNIT = 10_000_000;

export function shortenAddress(address: string, chars = 4): string {
  if (!address || address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function stroopsToAmount(stroops: string | number): number {
  const value = typeof stroops === "string" ? Number(stroops) : stroops;
  return value / STROOPS_PER_UNIT;
}

export function amountToStroops(amount: string | number): string {
  const value = typeof amount === "string" ? Number(amount) : amount;
  return Math.round(value * STROOPS_PER_UNIT).toString();
}

export function formatAmount(stroops: string | number, symbol = ""): string {
  const value = stroopsToAmount(stroops);
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 7,
  });
  return symbol ? `${formatted} ${symbol}` : formatted;
}

export function formatDeadline(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function getTimeRemaining(unixSeconds: number, now: number = Date.now()): TimeRemaining {
  const diffMs = unixSeconds * 1000 - now;
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  const totalSeconds = Math.floor(diffMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isExpired: false,
  };
}

export function formatCountdown(remaining: TimeRemaining): string {
  if (remaining.isExpired) return "Expired";
  if (remaining.days > 0) return `${remaining.days}d ${remaining.hours}h`;
  if (remaining.hours > 0) return `${remaining.hours}h ${remaining.minutes}m`;
  return `${remaining.minutes}m ${remaining.seconds}s`;
}

export const USDC_CONTRACT =
  process.env.NEXT_PUBLIC_USDC_CONTRACT ??
  "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5";

const STELLAR_ADDRESS_RE = /^G[A-Z2-7]{55}$/;

export function isValidStellarAddress(address: string): boolean {
  return STELLAR_ADDRESS_RE.test(address);
}

export const STELLAR_NETWORK =
  process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? "TESTNET";

export const HORIZON_URL =
  process.env.NEXT_PUBLIC_HORIZON_URL ?? "https://horizon-testnet.stellar.org";

export const SOROBAN_RPC_URL =
  process.env.NEXT_PUBLIC_SOROBAN_RPC_URL ?? "https://soroban-testnet.stellar.org";

export function stellarExpertTxUrl(txHash: string): string {
  const network = STELLAR_NETWORK.toLowerCase();
  return `https://stellar.expert/explorer/${network}/tx/${txHash}`;
}
