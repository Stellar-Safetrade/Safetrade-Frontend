"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TradeCard } from "@/components/trade/TradeCard";
import { useWallet } from "@/lib/wallet-context";
import { listTrades } from "@/lib/contract";
import { MOCK_TRADES } from "@/lib/mock-trades";
import { clsx } from "@/lib/clsx";
import type { Trade, TradeStatus } from "@/types/trade";

type FilterTab = "All" | TradeStatus | "Mine";

const STATUS_TABS: FilterTab[] = ["All", "Funded", "Completed", "Disputed", "Cancelled"];

export default function TradesPage() {
  const { address } = useWallet();
  const [trades, setTrades] = useState<Trade[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [tab, setTab] = useState<FilterTab>("All");

  useEffect(() => {
    listTrades()
      .then((t) => {
        setTrades(t);
        setDemoMode(t === MOCK_TRADES);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load trades"));
  }, []);

  const tabs = useMemo<FilterTab[]>(
    () => (address ? [...STATUS_TABS, "Mine"] : STATUS_TABS),
    [address]
  );

  const filtered = useMemo(() => {
    if (!trades) return trades;
    if (tab === "All") return trades;
    if (tab === "Mine") return trades.filter((t) => t.buyer === address || t.seller === address);
    return trades.filter((t) => t.status === tab);
  }, [trades, tab, address]);

  return (
    <>
      <Navbar />

      <section className="mx-auto max-w-[1100px] px-6 py-16 md:px-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[2px] text-accent">
              Marketplace
            </div>
            <h1 className="text-[32px] font-bold tracking-[-1px] md:text-[40px]">Active trades</h1>
          </div>
          <Link
            href="/trades/new"
            className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-6 py-3 font-display text-sm font-bold text-background transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,212,170,0.3)]"
          >
            + New Trade
          </Link>
        </div>

        <div className="mb-10 flex flex-wrap gap-2 border-b border-border pb-4">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={clsx(
                "rounded-full px-4 py-2 text-[13px] font-semibold transition-colors",
                tab === t
                  ? "bg-accent text-background"
                  : "border border-border text-muted hover:border-muted hover:text-text"
              )}
            >
              {t === "Mine" ? "My Trades" : t}
            </button>
          ))}
        </div>

        {error && (
          <div className="rounded-xl border border-danger/30 bg-danger/5 px-6 py-4 text-sm text-danger">
            {error}
          </div>
        )}

        {demoMode && (
          <div className="mb-6 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-xs font-medium text-accent">
            Showing demo data — the SafeTrade backend isn&apos;t deployed yet.
          </div>
        )}

        {!error && trades === null && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[240px] animate-pulse rounded-2xl border border-border bg-card" />
            ))}
          </div>
        )}

        {filtered !== null && filtered.length === 0 && !error && (
          <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center text-muted">
            {tab === "All" ? (
              <>
                No trades yet. Be the first to{" "}
                <Link href="/trades/new" className="text-accent hover:underline">
                  start one
                </Link>
                .
              </>
            ) : (
              `No ${tab === "Mine" ? "trades for your wallet" : tab.toLowerCase() + " trades"} right now.`
            )}
          </div>
        )}

        {filtered && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((trade) => (
              <TradeCard key={trade.id} trade={trade} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
