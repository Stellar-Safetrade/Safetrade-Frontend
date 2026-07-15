"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useWallet } from "@/lib/wallet-context";
import { signXdr } from "@/lib/freighter";
import { buildCreateTradeTx, submitSignedTx } from "@/lib/contract";
import { amountToStroops } from "@/lib/stellar";

export function CreateTradeForm() {
  const router = useRouter();
  const { address, connect } = useWallet();

  const [seller, setSeller] = useState("");
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [item, setItem] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!address) {
      await connect();
      return;
    }

    setIsSubmitting(true);
    try {
      const deadlineUnix = Math.floor(new Date(deadline).getTime() / 1000);
      const unsignedXdr = await buildCreateTradeTx({
        buyer: address,
        seller,
        token,
        amount: amountToStroops(amount),
        deadline: deadlineUnix,
        item,
      });
      const signedXdr = await signXdr(unsignedXdr, { address });
      await submitSignedTx(signedXdr);
      router.push("/trades");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create trade");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        id="seller"
        label="Seller address"
        placeholder="G..."
        value={seller}
        onChange={(e) => setSeller(e.target.value)}
        required
      />
      <Input
        id="token"
        label="Token contract address"
        placeholder="C..."
        value={token}
        onChange={(e) => setToken(e.target.value)}
        required
      />
      <Input
        id="amount"
        label="Amount"
        type="number"
        step="0.0000001"
        min="0"
        placeholder="100.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Input
        id="deadline"
        label="Deadline"
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <Textarea
        id="item"
        label="Item description"
        placeholder="MacBook Pro M3, 16GB / 512GB"
        rows={3}
        value={item}
        onChange={(e) => setItem(e.target.value)}
        required
      />

      {error && <p className="text-sm text-danger">{error}</p>}

      <Button type="submit" isLoading={isSubmitting} className="mt-2 w-full">
        {address ? "Create Trade" : "Connect Wallet to Continue"}
      </Button>
    </form>
  );
}
