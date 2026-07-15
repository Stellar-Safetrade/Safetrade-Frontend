import {
  isConnected,
  isAllowed,
  requestAccess,
  getAddress,
  getNetworkDetails,
  signTransaction,
} from "@stellar/freighter-api";

export class FreighterNotInstalledError extends Error {
  constructor() {
    super("Freighter wallet extension is not installed.");
    this.name = "FreighterNotInstalledError";
  }
}

export async function isFreighterInstalled(): Promise<boolean> {
  const { isConnected: connected } = await isConnected();
  return connected;
}

export async function connectFreighter(): Promise<string> {
  const installed = await isFreighterInstalled();
  if (!installed) throw new FreighterNotInstalledError();

  const { isAllowed: allowed } = await isAllowed();
  const { address, error } = allowed ? await getAddress() : await requestAccess();
  if (error) throw new Error(error);
  return address;
}

export async function getConnectedAddress(): Promise<string | null> {
  const installed = await isFreighterInstalled();
  if (!installed) return null;

  const { isAllowed: allowed } = await isAllowed();
  if (!allowed) return null;

  const { address, error } = await getAddress();
  if (error) return null;
  return address;
}

export async function getFreighterNetworkPassphrase(): Promise<string> {
  const { networkPassphrase, error } = await getNetworkDetails();
  if (error) throw new Error(error);
  return networkPassphrase;
}

export async function signXdr(
  xdr: string,
  opts?: { networkPassphrase?: string; address?: string }
): Promise<string> {
  const { signedTxXdr, error } = await signTransaction(xdr, opts);
  if (error) throw new Error(error);
  return signedTxXdr;
}
