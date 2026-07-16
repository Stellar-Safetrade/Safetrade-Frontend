"use client";

export function BackendUnavailableModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-7 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-accent-dim text-2xl">
          🔌
        </div>
        <h3 className="mb-2 text-lg font-bold text-text">Backend not connected</h3>
        <p className="mb-6 text-sm leading-[1.7] text-muted">
          This action requires a connected backend. The SafeTrade API is not yet
          deployed. Connect your Freighter wallet and the backend to execute real
          escrow transactions.
        </p>
        <button
          onClick={onClose}
          className="w-full rounded-[10px] bg-accent px-6 py-3 font-display text-sm font-bold text-background transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,212,170,0.3)]"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
