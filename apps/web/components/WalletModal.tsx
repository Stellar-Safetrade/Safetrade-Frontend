"use client";

import { useWallet } from "@/lib/wallet-context";

export function WalletModal() {
  const { installModalOpen, closeInstallModal } = useWallet();

  if (!installModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm"
      onClick={closeInstallModal}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-7 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-accent-dim text-2xl">
          🔒
        </div>
        <h3 className="mb-2 text-lg font-bold text-text">Freighter wallet required</h3>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          SafeTrade uses Freighter to sign Stellar transactions. Install the browser
          extension to connect your wallet.
        </p>
        <a
          href="https://www.freighter.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-6 py-3 font-display text-sm font-bold text-background transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,212,170,0.3)]"
        >
          Install Freighter →
        </a>
        <button
          onClick={closeInstallModal}
          className="w-full rounded-[10px] border border-border px-6 py-3 font-display text-sm font-semibold text-muted transition-colors hover:border-muted hover:text-text"
        >
          Close
        </button>
      </div>
    </div>
  );
}
