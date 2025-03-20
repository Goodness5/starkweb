import { useState } from 'react';
import { createPaymasterClient } from '../../exports/starkweb.js';
import { http } from '../../exports/starkweb.js';
import { mainnet, sepolia } from '../../exports/chains.js';
import type { GaslessCompatibility } from '../../types/paymaster.js';
import type { ADDRESS } from '../../types/components.js';

export const checkAccountCompatibility = async (network: 'mainnet' | 'sepolia', accountAddress: ADDRESS) => {
  const [compatibility, setCompatibility] = useState<GaslessCompatibility | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const chain = network === 'mainnet' ? mainnet : sepolia;
  const paymasterClient = createPaymasterClient({
    chain,
    transport: http(`http://localhost:3003/paymaster/${network}`),
  });

  setLoading(true);
  try {
    const compatibilityStatus = await paymasterClient.checkAccountCompatibility({ accountAddress });
    setCompatibility(compatibilityStatus);
  } catch (err) {
    setError('Failed to check account compatibility');
  } finally {
    setLoading(false);
  }

  return { compatibility, loading, error };
};