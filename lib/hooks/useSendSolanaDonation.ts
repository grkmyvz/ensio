"use client";

import { useState, useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Connection,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  SOLANA_TOKEN_ADDRESSES,
  SOLANA_TOKEN_DECIMALS,
} from "@/lib/constants/solana-tokens";
import { TokenName } from "@/lib/types/chains";

interface SendSolanaDonationParams {
  to: string;
  amount: string;
  token: TokenName;
}

interface UseSendSolanaDonationReturn {
  sendDonation: (params: SendSolanaDonationParams) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  signature: string | null;
  reset: () => void;
}

async function getOrCreateAssociatedTokenAccount(
  connection: Connection,
  payer: PublicKey,
  mint: PublicKey,
  owner: PublicKey,
): Promise<PublicKey> {
  const [associatedTokenAddress] = PublicKey.findProgramAddressSync(
    [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID,
  );

  return associatedTokenAddress;
}

function createTransferInstruction(
  source: PublicKey,
  destination: PublicKey,
  owner: PublicKey,
  amount: bigint,
): TransactionInstruction {
  const keys = [
    { pubkey: source, isSigner: false, isWritable: true },
    { pubkey: destination, isSigner: false, isWritable: true },
    { pubkey: owner, isSigner: true, isWritable: false },
  ];

  const data = Buffer.alloc(9);
  data.writeUInt8(3, 0);
  data.writeBigUInt64LE(amount, 1);

  return new TransactionInstruction({
    keys,
    programId: TOKEN_PROGRAM_ID,
    data,
  });
}

export function useSendSolanaDonation(): UseSendSolanaDonationReturn {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
    setSignature(null);
  }, []);

  const sendDonation = useCallback(
    async ({ to, amount, token }: SendSolanaDonationParams) => {
      if (!publicKey) {
        throw new Error("Wallet not connected");
      }

      setIsLoading(true);
      setIsError(false);
      setError(null);
      setIsSuccess(false);

      try {
        const recipientPubkey = new PublicKey(to);
        const transaction = new Transaction();

        if (token === "SOL") {
          const lamports = Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL);

          transaction.add(
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: recipientPubkey,
              lamports,
            }),
          );
        } else if (token === "USDC" || token === "USDT") {
          const mintAddress =
            SOLANA_TOKEN_ADDRESSES[
              token as keyof typeof SOLANA_TOKEN_ADDRESSES
            ];
          const decimals =
            SOLANA_TOKEN_DECIMALS[token as keyof typeof SOLANA_TOKEN_DECIMALS];

          const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            publicKey,
            mintAddress,
            publicKey,
          );

          const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            publicKey,
            mintAddress,
            recipientPubkey,
          );

          const recipientAccountInfo = await connection.getAccountInfo(
            recipientTokenAccount,
          );

          if (!recipientAccountInfo) {
            const createAtaIx = {
              keys: [
                { pubkey: publicKey, isSigner: true, isWritable: true },
                {
                  pubkey: recipientTokenAccount,
                  isSigner: false,
                  isWritable: true,
                },
                { pubkey: recipientPubkey, isSigner: false, isWritable: false },
                { pubkey: mintAddress, isSigner: false, isWritable: false },
                {
                  pubkey: SystemProgram.programId,
                  isSigner: false,
                  isWritable: false,
                },
                {
                  pubkey: TOKEN_PROGRAM_ID,
                  isSigner: false,
                  isWritable: false,
                },
              ],
              programId: ASSOCIATED_TOKEN_PROGRAM_ID,
              data: Buffer.from([]),
            };

            transaction.add(createAtaIx);
          }

          const transferAmount = BigInt(
            Math.floor(parseFloat(amount) * 10 ** decimals),
          );

          const transferIx = createTransferInstruction(
            senderTokenAccount,
            recipientTokenAccount,
            publicKey,
            transferAmount,
          );

          transaction.add(transferIx);
        } else {
          throw new Error(`Unsupported token: ${token}`);
        }

        const { blockhash, lastValidBlockHeight } =
          await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = publicKey;

        const sig = await sendTransaction(transaction, connection);
        setSignature(sig);

        await connection.confirmTransaction(
          {
            signature: sig,
            blockhash,
            lastValidBlockHeight,
          },
          "confirmed",
        );

        setIsSuccess(true);
        setIsLoading(false);
      } catch (err) {
        const error = err as Error;
        setError(error);
        setIsError(true);
        setIsLoading(false);
        throw error;
      }
    },
    [publicKey, connection, sendTransaction],
  );

  return {
    sendDonation,
    isLoading,
    isSuccess,
    isError,
    error,
    signature,
    reset,
  };
}
