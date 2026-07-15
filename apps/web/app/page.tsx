import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const STEPS = [
  {
    num: "01",
    icon: "🤝",
    title: "Agree on terms",
    body: "Buyer and seller agree on item, price, and deadline. SafeTrade generates a unique trade link.",
  },
  {
    num: "02",
    icon: "🔒",
    title: "Buyer locks funds",
    body: "Buyer deposits XLM or USDC into the Soroban escrow contract. Funds are locked — not held by us.",
  },
  {
    num: "03",
    icon: "📦",
    title: "Seller delivers",
    body: "Seller ships the item or delivers the product. Both parties can track trade status on-chain.",
  },
  {
    num: "04",
    icon: "✅",
    title: "Buyer confirms",
    body: "Buyer confirms receipt. The contract releases funds to the seller instantly on Stellar.",
  },
];

const FEATURES = [
  "Funds locked in Soroban contract, not a wallet",
  "Auto-refund if seller misses deadline",
  "On-chain dispute resolution",
  "USDC & XLM supported",
  "Trade history is public & verifiable",
];

export default function LandingPage() {
  return (
    <>
      <div className="pointer-events-none fixed -right-52 -top-52 z-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(123,94,167,0.08)_0%,transparent_70%)]" />
      <div className="pointer-events-none fixed -bottom-52 -left-24 z-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,212,170,0.05)_0%,transparent_70%)]" />

      <Navbar />

      <section className="relative mx-auto max-w-[1100px] px-6 pb-20 pt-24 md:px-12 md:pb-20 md:pt-[100px]">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent bg-accent-dim px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Built on Stellar · Soroban Smart Contracts
        </div>

        <h1 className="mb-6 max-w-[800px] text-[42px] font-bold leading-[1.05] tracking-[-2px] md:text-[72px]">
          Trade anything.
          <br />
          <span className="text-accent">Trust nothing</span>
          <br />
          but the chain.
        </h1>

        <p className="mb-12 max-w-[520px] text-lg leading-[1.7] text-muted">
          SafeTrade locks buyer funds in a Soroban escrow contract. Seller ships. Buyer
          confirms. Funds release instantly — no middlemen, no chargebacks, no disputes lost
          to bad actors.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/trades/new"
            className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-7 py-3.5 font-display text-[15px] font-bold text-background transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,212,170,0.3)]"
          >
            Start a Trade <span>→</span>
          </Link>
          <Link
            href="/trades"
            className="inline-flex items-center gap-2 rounded-[10px] border border-border px-7 py-3.5 font-display text-[15px] font-semibold text-text transition-colors hover:border-muted hover:bg-surface"
          >
            View open trades
          </Link>
        </div>

        <div className="mt-[72px] flex flex-wrap gap-12 border-t border-border pt-12">
          <div>
            <div className="font-mono text-[28px] font-bold text-text">
              <span className="text-accent">$</span>0
            </div>
            <div className="text-[13px] font-medium text-muted">Platform fees</div>
          </div>
          <div>
            <div className="font-mono text-[28px] font-bold text-text">
              5<span className="text-accent">s</span>
            </div>
            <div className="text-[13px] font-medium text-muted">Settlement time</div>
          </div>
          <div>
            <div className="font-mono text-[28px] font-bold text-text">
              100<span className="text-accent">%</span>
            </div>
            <div className="text-[13px] font-medium text-muted">Non-custodial</div>
          </div>
          <div>
            <div className="font-mono text-[28px] font-bold text-text">
              XLM<span className="text-accent">+</span>
            </div>
            <div className="text-[13px] font-medium text-muted">USDC supported</div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative mx-auto max-w-[1100px] px-6 py-20 md:px-12">
        <div className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[2px] text-accent">
          How it works
        </div>
        <h2 className="mb-14 max-w-[500px] text-[36px] font-bold leading-[1.15] tracking-[-1px]">
          Four steps. Zero trust required.
        </h2>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.num} className="bg-card px-7 py-9">
              <div className="mb-5 font-mono text-[11px] font-bold tracking-wide text-muted">
                {step.num}
              </div>
              <span className="mb-4 block text-[28px]">{step.icon}</span>
              <h3 className="mb-2.5 text-base font-semibold text-text">{step.title}</h3>
              <p className="text-sm leading-[1.6] text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative border-y border-border bg-surface px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <h4 className="font-mono text-[13px] font-semibold tracking-wide text-muted">
                TRADE #ST-00412
              </h4>
              <Badge tone="accent">Active</Badge>
            </CardHeader>
            <CardBody className="flex flex-col gap-3.5 py-6">
              <div className="flex items-center justify-between border-b border-border pb-3.5">
                <span className="text-[13px] font-medium text-muted">Item</span>
                <span className="font-mono text-[13px] font-semibold text-text">MacBook Pro M3</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3.5">
                <span className="text-[13px] font-medium text-muted">Amount locked</span>
                <span className="font-mono text-[13px] font-semibold text-stellar-glow">2,400 USDC</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3.5">
                <span className="text-[13px] font-medium text-muted">Seller</span>
                <span className="font-mono text-[13px] font-semibold text-text">G3XK...7FPQ</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3.5">
                <span className="text-[13px] font-medium text-muted">Buyer</span>
                <span className="font-mono text-[13px] font-semibold text-text">GBWQ...2MNA</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3.5">
                <span className="text-[13px] font-medium text-muted">Deadline</span>
                <span className="font-mono text-[13px] font-semibold text-text">Jul 22, 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-muted">Status</span>
                <Badge tone="warning">Awaiting delivery</Badge>
              </div>
            </CardBody>
            <CardFooter>
              <button className="flex-1 rounded-lg bg-accent py-3 font-display text-[13px] font-bold text-background">
                ✓ Confirm Receipt
              </button>
              <button className="rounded-lg border border-danger/30 px-4 py-3 font-display text-[13px] font-semibold text-danger">
                ⚑ Dispute
              </button>
            </CardFooter>
          </Card>

          <div>
            <h2 className="mb-4 text-[32px] font-bold leading-[1.2] tracking-[-1px]">
              Your funds stay on-chain until you&apos;re happy.
            </h2>
            <p className="mb-7 text-[15px] leading-[1.7] text-muted">
              Every trade is a Soroban smart contract on Stellar. No one — not even
              SafeTrade — can move your funds without both parties agreeing.
            </p>
            <ul className="flex flex-col gap-3">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm font-medium text-text">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-accent bg-accent-dim text-[11px] text-accent">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
