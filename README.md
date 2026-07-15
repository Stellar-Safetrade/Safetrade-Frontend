# SafeTrade - P2P Escrow on Stellar

SafeTrade is a frontend prototype for a peer-to-peer escrow marketplace built on the Stellar network. It is implemented as a modern Next.js + Tailwind CSS app with Freighter wallet integration and reusable UI components for trade listings, countdown timers, and trade status indicators.

## Project Overview

- **Platform:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Blockchain:** Stellar Testnet compatible
- **Wallet:** Freighter wallet integration
- **Key concepts:** trade escrow, Stellar asset amount formatting, time-based countdown, on-chain wallet connectivity

## Repository Structure

```
/apps/web
  ├─ app/                 # Next.js app entrypoint and page
  ├─ components/          # Shared UI and trade components
  ├─ lib/                 # Stellar helpers and wallet integration logic
  ├─ types/               # TypeScript trade models
  ├─ package.json         # app dependencies and scripts
  └─ tsconfig.json        # TypeScript config
```

## Features

- Connect to a Stellar wallet using the Freighter browser extension
- Display trade cards with item, amount locked, seller address, deadline countdown, and status
- Format Stellar stroop values into human-readable token amounts
- Show active expiry countdowns with live updates
- Support trade statuses: Funded, Completed, Disputed, Cancelled

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm (or yarn / pnpm)
- Freighter wallet installed in your browser

### Install dependencies

```bash
cd apps/web
npm install
```

### Run development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

From `apps/web`:

- `npm run dev` — start the development server
- `npm run build` — build the production app
- `npm run start` — run the production build locally
- `npm run lint` — run ESLint checks

## Environment Configuration

The app is configured to use the Stellar Testnet by default. You can override the default values using environment variables in a `.env` file or your shell.

- `NEXT_PUBLIC_STELLAR_NETWORK` — network identifier (default: `TESTNET`)
- `NEXT_PUBLIC_HORIZON_URL` — Horizon API endpoint (default: `https://horizon-testnet.stellar.org`)
- `NEXT_PUBLIC_SOROBAN_RPC_URL` — Soroban RPC endpoint (default: `https://soroban-testnet.stellar.org`)

## Architecture Details

### `apps/web/lib/freighter.ts`

- Wraps `@stellar/freighter-api` functions for wallet detection, connection, and transaction signing
- Provides wallet address retrieval and network details

### `apps/web/lib/stellar.ts`

- Converts between stroops and Stellar amount units
- Formats timeline countdowns and selection-friendly address strings
- Exposes default network endpoints and fallback configuration

### `apps/web/lib/wallet-context.tsx`

- Provides a React context for wallet connection state
- Tracks current address, connection status, and connection errors

### `apps/web/components/trade`

- `TradeCard.tsx` — renders a trade summary card
- `TradeStatus.tsx` — displays a badge for each trade state
- `Countdown.tsx` — updates remaining time in real time

## Notes

This repository currently contains the frontend scaffolding and user interface for SafeTrade. Backend or contract integration is expected through the Stellar network and Freighter wallet actions.

## Contributions

If you want to extend SafeTrade:

1. Add trade creation / escrow execution flows
2. Integrate real Stellar asset issuance and trustline handling
3. Add a backend or Soroban smart contract layer
4. Improve UI with real marketplace pages and trade detail workflows

## License

Open source for development and experimentation.
