"use client";

import {
  useSendTransaction,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { parseEther, parseUnits } from "viem";
import {
  TOKEN_ADDRESSES,
  TOKEN_DECIMALS,
  ERC20_ABI,
} from "@/lib/constants/tokens";

interface SendDonationParams {
  to: string;
  amount: string;
  token: string;
}

export function useSendDonation() {
  // For ETH transfers
  const {
    data: ethHash,
    sendTransaction,
    isPending: isEthPending,
    isError: isEthSendError,
    error: ethSendError,
    reset: resetEth,
  } = useSendTransaction();

  // For ERC20 transfers
  const {
    data: erc20Hash,
    writeContract,
    isPending: isErc20Pending,
    isError: isErc20WriteError,
    error: erc20WriteError,
    reset: resetErc20,
  } = useWriteContract();

  // Wait for ETH transaction
  const {
    isLoading: isEthConfirming,
    isSuccess: isEthConfirmed,
    isError: isEthConfirmError,
    error: ethConfirmError,
  } = useWaitForTransactionReceipt({
    hash: ethHash,
  });

  // Wait for ERC20 transaction
  const {
    isLoading: isErc20Confirming,
    isSuccess: isErc20Confirmed,
    isError: isErc20ConfirmError,
    error: erc20ConfirmError,
  } = useWaitForTransactionReceipt({
    hash: erc20Hash,
  });

  const sendDonation = ({ to, amount, token }: SendDonationParams) => {
    if (token === "ETH") {
      // ETH transfer
      sendTransaction({
        to: to as `0x${string}`,
        value: parseEther(amount),
      });
    } else if (token === "USDC" || token === "USDT") {
      // ERC20 transfer
      const tokenAddress =
        TOKEN_ADDRESSES[token as keyof typeof TOKEN_ADDRESSES];
      const decimals = TOKEN_DECIMALS[token as keyof typeof TOKEN_DECIMALS];
      const parsedAmount = parseUnits(amount, decimals);

      writeContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "transfer",
        args: [to as `0x${string}`, parsedAmount],
      });
    } else {
      throw new Error(`Unsupported token: ${token}`);
    }
  };

  const reset = () => {
    resetEth();
    resetErc20();
  };

  const isLoading =
    isEthPending || isEthConfirming || isErc20Pending || isErc20Confirming;
  const isSuccess = isEthConfirmed || isErc20Confirmed;
  const isError =
    isEthSendError ||
    isEthConfirmError ||
    isErc20WriteError ||
    isErc20ConfirmError;
  const error =
    ethSendError || ethConfirmError || erc20WriteError || erc20ConfirmError;
  const hash = ethHash || erc20Hash;

  return {
    sendDonation,
    isLoading,
    isSuccess,
    isError,
    error,
    hash,
    reset,
  };
}
