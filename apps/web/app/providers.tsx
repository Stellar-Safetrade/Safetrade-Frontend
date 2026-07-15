"use client";

import { ReactNode } from "react";
import { WalletProvider } from "@/lib/wallet-context";
import { ToastProvider } from "@/components/Toast";
import { WalletModal } from "@/components/WalletModal";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WalletProvider>
      <ToastProvider>
        {children}
        <WalletModal />
      </ToastProvider>
    </WalletProvider>
  );
}
