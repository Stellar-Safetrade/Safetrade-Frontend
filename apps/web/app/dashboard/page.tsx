"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { TradeCard } from "@/components/trade/TradeCard";
import { useWallet } from "@/lib/wallet-context";
import { listTrades } from "@/lib/contract";
import type { Trade } from "@/types/trade";

export default function DashboardPage() {
  const { address, connect, isConnecting } = useWallet();
  const [trades, setTrades] = useState<Trade[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;
    listTrades()
      .then(setTrades)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load trades"));
  }, [address]);

  const asBuyer = trades?.filter((t) => t.buyer === address) ?? [];
  const asSeller = trades?.filter((t) => t.seller === address) ?? [];

  return (
    <>
      <Navbar />

      <section className="mx-auto max-w-[1100px] px-6 py-16 md:px-12">
        <div className="mb-10">
          <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[2px] text-accent">
            Dashboard
          </div>
          <h1 className="text-[32px] font-bold tracking-[-1px] md:text-[40px]">Your trades</h1>
        </div>

        {!address && (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <p className="text-muted">Connect your wallet to see trades you&apos;re buying or selling.</p>
            <Button onClick={connect} isLoading={isConnecting}>
              Connect Wallet
            </Button>
          </div>
        )}

        {address && error && (
          <div className="rounded-xl border border-danger/30 bg-danger/5 px-6 py-4 text-sm text-danger">
            {error}
          </div>
        )}

        {address && !error && trades === null && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[240px] animate-pulse rounded-2xl border border-border bg-card" />
            ))}
          </div>
        )}

        {address && trades && (
          <div className="flex flex-col gap-14">
            <TradeSection title="Buying" trades={asBuyer} emptyLabel="You haven't started any trades as a buyer." />
            <TradeSection title="Selling" trades={asSeller} emptyLabel="You haven't been added to any trades as a seller." />
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

function TradeSection({
  title,
  trades,
  emptyLabel,
}: {
  title: string;
  trades: Trade[];
  emptyLabel: string;
}) {
  return (
    <div>
      <h2 className="mb-5 text-xl font-semibold text-text">{title}</h2>
      {trades.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card px-6 py-10 text-center text-sm text-muted">
          {emptyLabel}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trades.map((trade) => (
            <TradeCard key={trade.id} trade={trade} />
          ))}
        </div>
      )}
    </div>
  );
}
