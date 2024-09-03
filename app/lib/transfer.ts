import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export default async function transferSolana(
  from: Keypair,
  to: PublicKey,
  amount: number
) {
  const transaction = new Transaction();

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  const instruction = SystemProgram.transfer({
    fromPubkey: from.publicKey,
    toPubkey: to,
    lamports: LAMPORTS_PER_SOL * amount,
  });

  transaction.add(instruction);

  await sendAndConfirmTransaction(connection, transaction, [from]);
}