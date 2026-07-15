export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1100px] flex-col-reverse items-center gap-4 border-t border-border px-6 py-8 text-center md:flex-row md:justify-between md:px-12 md:text-left">
      <p className="text-[13px] text-muted">© 2026 SafeTrade · Open source · MIT License</p>
      <div className="flex items-center gap-2 text-[13px] text-muted">
        <span className="h-2 w-2 rounded-full bg-stellar-glow" />
        Powered by Stellar & Soroban
      </div>
    </footer>
  );
}
