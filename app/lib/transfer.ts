import prisma from "@/prisma";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { getServerSession } from "next-auth";
import authOptions from "./auth";

export default async function transferSolana(to: PublicKey, amount: number) {
  const session = await getServerSession(authOptions);
  const username = session.user.email;
  const transaction = new Transaction();

  const userInfo = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      solwallet: true,
    },
  });

  const fromKeyPair = userInfo?.solwallet[0].privateKey || "";

  const b = fromKeyPair.split(",").map(function (item) {
    return Number(item);
  });

  const secret = Uint8Array.from(b);
  const from = Keypair.fromSecretKey(secret);

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
  console.log("Transfer Successful!");
}
