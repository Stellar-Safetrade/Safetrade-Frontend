"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useWallet } from "@/lib/wallet-context";
import { useToast } from "@/components/Toast";
import { signXdr } from "@/lib/freighter";
import { buildCreateTradeTx, submitSignedTx } from "@/lib/contract";
import { amountToStroops, isValidStellarAddress, USDC_CONTRACT } from "@/lib/stellar";

function tomorrowDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

interface FormErrors {
  seller?: string;
  amount?: string;
  deadline?: string;
  item?: string;
}

export function CreateTradeForm() {
  const router = useRouter();
  const { address } = useWallet();
  const toast = useToast();

  const [seller, setSeller] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [item, setItem] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): FormErrors {
    const next: FormErrors = {};

    if (!seller.trim()) {
      next.seller = "Seller address is required.";
    } else if (!isValidStellarAddress(seller.trim())) {
      next.seller = "Enter a valid Stellar address (starts with G, 56 characters).";
    } else if (address && seller.trim() === address) {
      next.seller = "Seller can't be the same as your connected wallet.";
    }

    const amountNum = Number(amount);
    if (!amount) {
      next.amount = "Amount is required.";
    } else if (Number.isNaN(amountNum) || amountNum <= 0) {
      next.amount = "Amount must be greater than 0.";
    }

    if (!deadline) {
      next.deadline = "Deadline is required.";
    } else if (new Date(deadline).getTime() <= Date.now()) {
      next.deadline = "Deadline must be in the future.";
    }

    if (!item.trim()) {
      next.item = "Item description is required.";
    }

    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!address) return;

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const deadlineUnix = Math.floor(new Date(deadline).getTime() / 1000);
      const unsignedXdr = await buildCreateTradeTx({
        buyer: address,
        seller: seller.trim(),
        token: USDC_CONTRACT,
        amount: amountToStroops(amount),
        deadline: deadlineUnix,
        item: item.trim(),
      });
      const signedXdr = await signXdr(unsignedXdr, { address });
      const { tradeId } = await submitSignedTx(signedXdr);
      toast.success("Trade created — funds locked in escrow.");
      router.push(tradeId !== undefined ? `/trades/${tradeId}` : "/trades");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create trade");
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
        error={errors.seller}
        required
      />
      <Input
        id="amount"
        label="Amount (USDC)"
        type="number"
        step="0.0000001"
        min="0"
        placeholder="100.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        error={errors.amount}
        required
      />
      <Input
        id="deadline"
        label="Deadline"
        type="date"
        min={tomorrowDateString()}
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        error={errors.deadline}
        required
      />
      <Textarea
        id="item"
        label="Item description"
        placeholder="MacBook Pro M3, 16GB / 512GB"
        rows={3}
        value={item}
        onChange={(e) => setItem(e.target.value)}
        error={errors.item}
        required
      />

      <Button type="submit" isLoading={isSubmitting} className="mt-2 w-full">
        Create Trade
      </Button>
    </form>
  );
}
