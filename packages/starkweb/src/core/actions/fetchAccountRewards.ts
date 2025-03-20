import { useState } from 'react';
import { createPaymasterClient } from '../../exports/starkweb.js';
import { http } from '../../exports/starkweb.js';
import { mainnet, sepolia } from '../../exports/chains.js';
import type { PaymasterReward } from '../../types/paymaster.js';
import type { ADDRESS } from '../../types/components.js';

export const fetchAccountRewards = async (network: 'mainnet' | 'sepolia', accountAddress: ADDRESS) => {
  const [rewards, setRewards] = useState<PaymasterReward[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const chain = network === 'mainnet' ? mainnet : sepolia;
  const paymasterClient = createPaymasterClient({
    chain,
    transport: http(`http://localhost:3003/paymaster/${network}`),
  });

  setLoading(true);
  try {
    const accountRewards = await paymasterClient.getAccountRewards({ accountAddress });
    setRewards(accountRewards);
  } catch (err) {
    setError('Failed to fetch account rewards');
  } finally {
    setLoading(false);
  }

  return { rewards, loading, error };
};