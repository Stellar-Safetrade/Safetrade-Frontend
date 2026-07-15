import type { CreateTradeInput, Trade } from "@/types/trade";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Request to ${path} failed (${res.status}): ${body}`);
  }
  return res.json() as Promise<T>;
}

export async function getTradeCount(): Promise<number> {
  const { count } = await apiFetch<{ count: number }>("/api/trades/count");
  return count;
}

export async function getTrade(id: number): Promise<Trade> {
  return apiFetch<Trade>(`/api/trades/${id}`);
}

export async function listTrades(): Promise<Trade[]> {
  const count = await getTradeCount();
  const ids = Array.from({ length: count }, (_, i) => i);
  const results = await Promise.allSettled(ids.map((id) => getTrade(id)));
  return results
    .filter((r): r is PromiseFulfilledResult<Trade> => r.status === "fulfilled")
    .map((r) => r.value);
}

export async function buildCreateTradeTx(
  input: CreateTradeInput
): Promise<string> {
  const { unsignedXdr } = await apiFetch<{ unsignedXdr: string }>(
    "/api/trades/build",
    { method: "POST", body: JSON.stringify(input) }
  );
  return unsignedXdr;
}

export async function submitSignedTx(signedXdr: string): Promise<string> {
  const { txHash } = await apiFetch<{ txHash: string }>("/api/trades/submit", {
    method: "POST",
    body: JSON.stringify({ signedXdr }),
  });
  return txHash;
}

/**
 * NOTE: the backend API spec only documents /api/trades/build + /submit for
 * trade creation. confirm_receipt / cancel_trade / open_dispute need their own
 * "build unsigned XDR" endpoints — the paths below follow the same REST
 * convention but aren't confirmed against the real backend. Adjust once the
 * actual routes are known.
 */
export async function buildConfirmReceiptTx(
  tradeId: number,
  buyer: string
): Promise<string> {
  const { unsignedXdr } = await apiFetch<{ unsignedXdr: string }>(
    `/api/trades/${tradeId}/confirm/build`,
    { method: "POST", body: JSON.stringify({ buyer }) }
  );
  return unsignedXdr;
}

export async function buildCancelTradeTx(
  tradeId: number,
  caller: string
): Promise<string> {
  const { unsignedXdr } = await apiFetch<{ unsignedXdr: string }>(
    `/api/trades/${tradeId}/cancel/build`,
    { method: "POST", body: JSON.stringify({ caller }) }
  );
  return unsignedXdr;
}

export async function buildOpenDisputeTx(
  tradeId: number,
  buyer: string
): Promise<string> {
  const { unsignedXdr } = await apiFetch<{ unsignedXdr: string }>(
    `/api/trades/${tradeId}/dispute/build`,
    { method: "POST", body: JSON.stringify({ buyer }) }
  );
  return unsignedXdr;
}
