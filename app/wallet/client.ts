import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { saigon } from 'viem/chains';
import { waypointProvider } from './provider';

export const publicClient = createPublicClient({
  chain: saigon,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: saigon,
  transport: custom(waypointProvider),
});