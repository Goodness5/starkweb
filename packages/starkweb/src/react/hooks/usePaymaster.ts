"use client"
import { useState, useEffect } from 'react';
import {fetchAccountRewards} from '../../core/exports/actions.js'
import { checkAccountCompatibility } from '../../core/exports/actions.js'
import { fetchPaymasterStatus } from '../../core/exports/actions.js'
import type { GaslessStatus, GaslessCompatibility, PaymasterReward } from '../../types/paymaster.js';
import type { ADDRESS } from '../../types/components.js';

export type UsePaymasterProps = {
  network: 'mainnet' | 'sepolia';
  accountAddress?: ADDRESS;
};

export type UsePaymasterReturn = {
  status: GaslessStatus | null;
  compatibility: GaslessCompatibility | null;
  rewards: PaymasterReward[];
  loading: boolean;
  error: string | null;
  refetch: {
    fetchPaymasterStatus: () => Promise<GaslessStatus | null>;
    checkAccountCompatibility: () => Promise<GaslessCompatibility | null>;
    fetchAccountRewards: () => Promise<PaymasterReward[]>;
  };
};

/**
 * Custom hook to interact with the Paymaster service.
 *
 * @param {('mainnet' | 'sepolia')} network - The network to connect to, either 'mainnet' or 'sepolia'.
 * @param {ADDRESS} [accountAddress] - Optional account address to check compatibility and fetch rewards.
 * @returns {Object} An object containing the following properties and methods:
 * - `status` {GaslessStatus | null} - The current status of the Paymaster.
 * - `compatibility` {GaslessCompatibility | null} - The compatibility status of the provided account address.
 * - `rewards` {PaymasterReward[]} - The rewards associated with the provided account address.
 * - `loading` {boolean} - Indicates if a request is currently in progress.
 * - `error` {string | null} - Error message if any request fails.
 * - `refetch` {Object} - An object containing methods to manually refetch data:
 *   - `fetchPaymasterStatus` {Function} - Method to refetch the Paymaster status.
 *   - `checkAccountCompatibility` {Function} - Method to refetch the account compatibility status.
 *   - `fetchAccountRewards` {Function} - Method to refetch the account rewards.
 */
export const usePaymaster = ({ network, accountAddress }: UsePaymasterProps): UsePaymasterReturn => {
  const [status, setStatus] = useState<GaslessStatus | null>(null);
  const [compatibility, setCompatibility] = useState<GaslessCompatibility | null>(null);
  const [rewards, setRewards] = useState<PaymasterReward[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { status, loading: paymasterLoading, error: paymasterError } = await fetchPaymasterStatus(network);
      setStatus(status);
      setLoading(paymasterLoading);
      setError(paymasterError);

      if (accountAddress) {
        const { compatibility, loading: compatibilityLoading, error: compatibilityError } = await checkAccountCompatibility(network, accountAddress);
        setCompatibility(compatibility);
        setLoading(compatibilityLoading);
        setError(compatibilityError);

        const { rewards, loading: rewardsLoading, error: rewardsError } = await fetchAccountRewards(network, accountAddress);
        setRewards(rewards);
        setLoading(rewardsLoading);
        setError(rewardsError);
      }
    };

    fetchData();
  }, [network, accountAddress]);

  return {
    status,
    compatibility,
    rewards,
    loading,
    error,
    refetch: {
      fetchPaymasterStatus: async () => {
        const { status } = await fetchPaymasterStatus(network);
        return status;
      },
      checkAccountCompatibility: async () => {
        const { compatibility } = await checkAccountCompatibility(network, accountAddress!);
        return compatibility;
      },
      fetchAccountRewards: async () => {
        const { rewards } = await fetchAccountRewards(network, accountAddress!);
        return rewards;
      },
    },
  };
};