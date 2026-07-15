"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TradeCard } from "@/components/trade/TradeCard";
import { listTrades } from "@/lib/contract";
import type { Trade } from "@/types/trade";

export default function TradesPage() {
  const [trades, setTrades] = useState<Trade[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listTrades()
      .then(setTrades)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load trades"));
  }, []);

  return (
    <>
      <Navbar />

      <section className="mx-auto max-w-[1100px] px-6 py-16 md:px-12">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
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

        {error && (
          <div className="rounded-xl border border-danger/30 bg-danger/5 px-6 py-4 text-sm text-danger">
            {error}
          </div>
        )}

        {!error && trades === null && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[240px] animate-pulse rounded-2xl border border-border bg-card" />
            ))}
          </div>
        )}

        {trades !== null && trades.length === 0 && !error && (
          <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center text-muted">
            No trades yet. Be the first to{" "}
            <Link href="/trades/new" className="text-accent hover:underline">
              start one
            </Link>
            .
          </div>
        )}

        {trades && trades.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trades.map((trade) => (
              <TradeCard key={trade.id} trade={trade} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
