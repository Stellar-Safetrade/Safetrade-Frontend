import { Badge } from "@/components/ui/Badge";
import type { TradeStatus as TradeStatusType } from "@/types/trade";

const STATUS_CONFIG: Record<TradeStatusType, { label: string; tone: "accent" | "blue" | "warning" | "danger" }> = {
  Funded: { label: "Funded", tone: "accent" },
  Completed: { label: "Completed", tone: "blue" },
  Disputed: { label: "Disputed", tone: "warning" },
  Cancelled: { label: "Cancelled", tone: "danger" },
};

export function TradeStatus({ status }: { status: TradeStatusType }) {
  const config = STATUS_CONFIG[status];
  return <Badge tone={config.tone}>{config.label}</Badge>;
}
