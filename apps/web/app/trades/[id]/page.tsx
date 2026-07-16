"use client";

import { useCallback, useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TradeStatus } from "@/components/trade/TradeStatus";
import { Countdown } from "@/components/trade/Countdown";
import { useWallet } from "@/lib/wallet-context";
import { useToast } from "@/components/Toast";
import { BackendUnavailableModal } from "@/components/BackendUnavailableModal";
import { signXdr } from "@/lib/freighter";
import {
  getTrade,
  buildConfirmReceiptTx,
  buildCancelTradeTx,
  buildOpenDisputeTx,
  submitSignedTx,
  BackendUnavailableError,
} from "@/lib/contract";
import { MOCK_TRADES } from "@/lib/mock-trades";
import {
  formatAmount,
  formatDeadline,
  shortenAddress,
  stellarExpertTxUrl,
} from "@/lib/stellar";
import type { Trade } from "@/types/trade";

type ActionKind = "confirm" | "cancel" | "dispute" | null;

const ACTION_LABEL: Record<Exclude<ActionKind, null>, string> = {
  confirm: "Receipt confirmed — funds released to seller.",
  cancel: "Trade cancelled.",
  dispute: "Dispute opened.",
};

export default function TradeDetailPage({ params }: { params: { id: string } }) {
  const tradeId = Number(params.id);
  const { address, connect } = useWallet();
  const toast = useToast();

  const [trade, setTrade] = useState<Trade | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<ActionKind>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [backendModalOpen, setBackendModalOpen] = useState(false);

  const refresh = useCallback(() => {
    getTrade(tradeId)
      .then((t) => {
        setTrade(t);
        setDemoMode(false);
      })
      .catch((err) => {
        if (err instanceof BackendUnavailableError) {
          const mock = MOCK_TRADES.find((t) => t.id === tradeId);
          if (mock) {
            setTrade(mock);
            setDemoMode(true);
            return;
          }
        }
        setError(err instanceof Error ? err.message : "Failed to load trade");
      });
  }, [tradeId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function runAction(
    kind: Exclude<ActionKind, null>,
    build: () => Promise<string>
  ) {
    if (!address) {
      await connect();
      return;
    }
    setPendingAction(kind);
    try {
      const unsignedXdr = await build();
      const signedXdr = await signXdr(unsignedXdr, { address });
      await submitSignedTx(signedXdr);
      toast.success(ACTION_LABEL[kind]);
      refresh();
    } catch (err) {
      if (err instanceof BackendUnavailableError) {
        setBackendModalOpen(true);
      } else {
        toast.error(err instanceof Error ? err.message : `Failed to ${kind} trade`);
      }
    } finally {
      setPendingAction(null);
    }
  }

  if (error) {
    return (
      <>
        <Navbar />
        <section className="mx-auto max-w-[640px] px-6 py-16 md:px-12">
          <div className="rounded-xl border border-danger/30 bg-danger/5 px-6 py-4 text-sm text-danger">
            {error}
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (!trade) {
    return (
      <>
        <Navbar />
        <section className="mx-auto max-w-[640px] px-6 py-16 md:px-12">
          <div className="h-[400px] animate-pulse rounded-2xl border border-border bg-card" />
        </section>
        <Footer />
      </>
    );
  }

  const isBuyer = demoMode ? Boolean(address) : address === trade.buyer;
  const isSeller = demoMode ? false : address === trade.seller;
  const canAct = trade.status === "Funded";

  return (
    <>
      <Navbar />

      <section className="mx-auto max-w-[640px] px-6 py-16 md:px-12">
        <div className="mb-8">
          <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[2px] text-accent">
            Trade #{String(trade.id).padStart(5, "0")}
          </div>
          <h1 className="text-[32px] font-bold tracking-[-1px] md:text-[40px]">{trade.item}</h1>
        </div>

        {demoMode && (
          <div className="mb-6 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-xs font-medium text-accent">
            Demo trade — the SafeTrade backend isn&apos;t deployed yet. Actions below will
            explain what&apos;s needed instead of executing a real transaction.
          </div>
        )}

        <Card>
          <CardHeader>
            <h4 className="font-mono text-[13px] font-semibold tracking-wide text-muted">
              ESCROW DETAILS
            </h4>
            <TradeStatus status={trade.status} />
          </CardHeader>
          <CardBody className="flex flex-col gap-3.5">
            <Row label="Item" value={trade.item} />
            <Row label="Amount locked" value={formatAmount(trade.amount)} mono accent />
            <Row label="Buyer" value={shortenAddress(trade.buyer)} mono />
            <Row label="Seller" value={shortenAddress(trade.seller)} mono />
            <Row label="Token" value={shortenAddress(trade.token)} mono />
            <Row label="Deadline" value={formatDeadline(trade.deadline)} mono />
            <Row
              label="Time remaining"
              value={<Countdown deadline={trade.deadline} />}
              mono
            />
            {trade.txHash && (
              <Row
                label="Transaction"
                value={
                  <a
                    href={stellarExpertTxUrl(trade.txHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {shortenAddress(trade.txHash)} ↗
                  </a>
                }
                mono
              />
            )}
          </CardBody>

          {isBuyer && canAct && (
            <CardFooter className="flex-wrap">
              <Button
                variant="primary"
                className="flex-1"
                isLoading={pendingAction === "confirm"}
                disabled={pendingAction !== null}
                onClick={() =>
                  runAction("confirm", () => buildConfirmReceiptTx(trade.id, trade.buyer))
                }
              >
                ✓ Confirm Receipt
              </Button>
              <Button
                variant="danger"
                isLoading={pendingAction === "dispute"}
                disabled={pendingAction !== null}
                onClick={() =>
                  runAction("dispute", () => buildOpenDisputeTx(trade.id, trade.buyer))
                }
              >
                ⚑ Open Dispute
              </Button>
              <Button
                variant="secondary"
                isLoading={pendingAction === "cancel"}
                disabled={pendingAction !== null}
                onClick={() =>
                  runAction("cancel", () => buildCancelTradeTx(trade.id, address as string))
                }
              >
                Cancel Trade
              </Button>
            </CardFooter>
          )}
        </Card>

        {!isBuyer && isSeller && canAct && (
          <p className="mt-4 text-sm text-muted">
            Waiting on the buyer to confirm receipt, cancel, or open a dispute.
          </p>
        )}
        {!address && canAct && (
          <p className="mt-4 text-sm text-muted">
            Connect the buyer wallet to manage this trade.
          </p>
        )}
      </section>

      <Footer />

      <BackendUnavailableModal
        open={backendModalOpen}
        onClose={() => setBackendModalOpen(false)}
      />
    </>
  );
}

function Row({
  label,
  value,
  mono,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3.5 last:border-b-0 last:pb-0">
      <span className="text-[13px] font-medium text-muted">{label}</span>
      <span
        className={[
          "text-[13px] font-semibold",
          mono ? "font-mono" : "",
          accent ? "text-stellar-glow" : "text-text",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}
