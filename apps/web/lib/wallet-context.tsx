"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  connectFreighter,
  getConnectedAddress,
  FreighterNotInstalledError,
} from "@/lib/freighter";

const DISCONNECTED_KEY = "safetrade:wallet-disconnected";

interface WalletContextValue {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  installModalOpen: boolean;
  closeInstallModal: () => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [installModalOpen, setInstallModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISCONNECTED_KEY) === "1") return;
    getConnectedAddress().then(setAddress).catch(() => setAddress(null));
  }, []);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const addr = await connectFreighter();
      setAddress(addr);
      localStorage.removeItem(DISCONNECTED_KEY);
    } catch (err) {
      if (err instanceof FreighterNotInstalledError) {
        setInstallModalOpen(true);
      } else {
        setError(err instanceof Error ? err.message : "Failed to connect wallet");
      }
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    localStorage.setItem(DISCONNECTED_KEY, "1");
  }, []);

  const closeInstallModal = useCallback(() => setInstallModalOpen(false), []);

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: address !== null,
        isConnecting,
        error,
        connect,
        disconnect,
        installModalOpen,
        closeInstallModal,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider");
  return ctx;
}
