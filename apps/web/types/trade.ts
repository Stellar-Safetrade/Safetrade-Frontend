export type TradeStatus = "Funded" | "Completed" | "Disputed" | "Cancelled";

export interface Trade {
  id: number;
  buyer: string; // Stellar address
  seller: string; // Stellar address
  token: string; // token contract address
  amount: string; // in stroops
  deadline: number; // unix timestamp
  status: TradeStatus;
  item: string; // item description
}

export interface CreateTradeInput {
  buyer: string;
  seller: string;
  token: string;
  amount: string;
  deadline: number;
  item: string;
}
