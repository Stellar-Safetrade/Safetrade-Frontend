import Link from "next/link";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { TradeStatus } from "@/components/trade/TradeStatus";
import { Countdown } from "@/components/trade/Countdown";
import { formatAmount, shortenAddress } from "@/lib/stellar";
import type { Trade } from "@/types/trade";

export function TradeCard({ trade }: { trade: Trade }) {
  return (
    <Link href={`/trades/${trade.id}`}>
      <Card className="transition-colors hover:border-muted">
        <CardHeader>
          <h4 className="font-mono text-[13px] font-semibold tracking-wide text-muted">
            TRADE #{String(trade.id).padStart(5, "0")}
          </h4>
          <TradeStatus status={trade.status} />
        </CardHeader>
        <CardBody className="flex flex-col gap-3 py-5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-muted">Item</span>
            <span className="truncate pl-4 text-[13px] font-semibold text-text">{trade.item}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-muted">Amount locked</span>
            <span className="font-mono text-[13px] font-semibold text-stellar-glow">
              {formatAmount(trade.amount)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-muted">Seller</span>
            <span className="font-mono text-[13px] font-semibold text-text">
              {shortenAddress(trade.seller)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-muted">Time left</span>
            <span className="font-mono text-[13px] font-semibold">
              <Countdown deadline={trade.deadline} />
            </span>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
