import type { Trade } from "@/types/trade";

export const MOCK_TRADES: Trade[] = [
  {
    id: 1,
    buyer: "GBWQ...2MNA",
    seller: "G3XK...7FPQ",
    token: "USDC",
    amount: "24000000000",
    deadline: 1753228800,
    status: "Funded",
    item: "MacBook Pro M3",
  },
  {
    id: 2,
    buyer: "GAXK...9PLQ",
    seller: "GBWQ...2MNA",
    token: "USDC",
    amount: "5000000000",
    deadline: 1753315200,
    status: "Funded",
    item: "iPhone 16 Pro",
  },
  {
    id: 3,
    buyer: "G3XK...7FPQ",
    seller: "GAXK...9PLQ",
    token: "USDC",
    amount: "80000000000",
    deadline: 1752624000,
    status: "Completed",
    item: "Sony A7IV Camera",
  },
];
