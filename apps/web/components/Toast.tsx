"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import { clsx } from "@/lib/clsx";

type ToastKind = "success" | "error";

interface ToastItem {
  id: number;
  kind: ToastKind;
  message: string;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (kind: ToastKind, message: string, duration: number) => {
      const id = ++nextId;
      setToasts((prev) => [...prev, { id, kind, message }]);
      setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  const success = useCallback((message: string) => push("success", message, 4000), [push]);
  const error = useCallback((message: string) => push("error", message, 6000), [push]);

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex w-[calc(100%-3rem)] max-w-sm flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={clsx(
              "flex items-start gap-3 rounded-xl border px-4 py-3.5 font-display text-sm font-medium shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-md animate-toast-in",
              t.kind === "success"
                ? "border-accent/30 bg-[#0f1f1cf2] text-accent"
                : "border-danger/30 bg-[#1f1113f2] text-danger"
            )}
          >
            <span className="mt-0.5 flex-shrink-0">{t.kind === "success" ? "✓" : "✕"}</span>
            <span className="flex-1 leading-snug text-text">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="flex-shrink-0 text-muted transition-colors hover:text-text"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
