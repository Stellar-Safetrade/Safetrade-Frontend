"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CreateTradeForm } from "@/components/trade/CreateTradeForm";
import { useWallet } from "@/lib/wallet-context";

export default function NewTradePage() {
  const { isConnected, isConnecting, connect } = useWallet();

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

        {isConnected ? (
          <Card>
            <CardBody>
              <CreateTradeForm />
            </CardBody>
          </Card>
        ) : (
          <Card>
            <CardBody className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="text-sm text-muted">
                Connect your wallet to create a trade. You&apos;ll be the buyer and sign the
                escrow transaction.
              </p>
              <Button onClick={connect} isLoading={isConnecting}>
                Connect Wallet
              </Button>
            </CardBody>
          </Card>
        )}
      </section>

      <Footer />
    </>
  );
}
