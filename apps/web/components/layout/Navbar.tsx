"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useWallet } from "@/lib/wallet-context";
import { shortenAddress } from "@/lib/stellar";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/trades", label: "Trades" },
  { href: "/docs", label: "Docs" },
];

export function Navbar() {
  const { address, isConnecting, connect, disconnect } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="SafeTrade" className="h-8 w-auto" />
        </Link>

        <ul className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {address ? (
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-[10px] border border-border bg-surface px-4 py-2.5 font-mono text-sm font-semibold text-text transition-colors hover:border-muted"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {shortenAddress(address)}
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-44 overflow-hidden rounded-xl border border-border bg-card shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
                  <button
                    onClick={() => {
                      disconnect();
                      setAccountOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-danger transition-colors hover:bg-danger/10"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button onClick={connect} isLoading={isConnecting} className="px-4 py-2.5 text-sm">
              Connect Wallet
            </Button>
          )}

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <ul className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-text"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
