"use client";

import Link from "next/link";
import { useWallet } from "@/lib/wallet-context";
import { shortenAddress } from "@/lib/stellar";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/trades", label: "Trades" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const { address, isConnecting, connect } = useWallet();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/90 px-6 py-5 backdrop-blur-md md:px-12">
      <Link href="/" className="font-mono text-xl font-bold tracking-tight text-text">
        Safe<span className="text-accent">Trade</span>
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

      <Button onClick={connect} isLoading={isConnecting} className="px-4 py-2.5 text-sm">
        {address ? shortenAddress(address) : "Connect Wallet"}
      </Button>
    </nav>
  );
}
