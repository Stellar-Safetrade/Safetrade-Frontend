import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardBody } from "@/components/ui/Card";
import { CreateTradeForm } from "@/components/trade/CreateTradeForm";

export default function NewTradePage() {
  return (
    <>
      <Navbar />

      <section className="mx-auto max-w-[640px] px-6 py-16 md:px-12">
        <div className="mb-10">
          <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[2px] text-accent">
            New Escrow
          </div>
          <h1 className="text-[32px] font-bold tracking-[-1px] md:text-[40px]">Create a trade</h1>
          <p className="mt-3 text-sm leading-[1.7] text-muted">
            Funds lock into a Soroban escrow contract as soon as you sign. The seller only
            gets paid once you confirm receipt.
          </p>
        </div>

        <Card>
          <CardBody>
            <CreateTradeForm />
          </CardBody>
        </Card>
      </section>

      <Footer />
    </>
  );
}
