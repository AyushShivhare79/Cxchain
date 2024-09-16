import prisma from "@/prisma";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { getServerSession } from "next-auth";
import authOptions from "./auth";
import { connection } from "./constants";

export default async function transferSolana(to: PublicKey, amount: number) {
  const session = await getServerSession(authOptions);
  // const username = session.user.email;
  const username = "ayushshivhare1003@gmail.com";
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
  // const b = fromKeyPair.split(",").map(function (item) {
  //   return Number(item);
  // });
  const b = [
    38, 154, 148, 188, 3, 255, 152, 85, 94, 174, 251, 67, 32, 214, 138, 195,
    209, 20, 167, 90, 154, 87, 30, 11, 166, 246, 98, 113, 249, 100, 127, 153,
    38, 200, 139, 118, 142, 179, 184, 107, 82, 210, 230, 135, 140, 82, 146, 185,
    98, 67, 98, 190, 157, 235, 94, 198, 205, 5, 160, 48, 74, 173, 166, 243,
  ];

  const secret = Uint8Array.from(b);
  const from = Keypair.fromSecretKey(secret);

  const instruction = SystemProgram.transfer({
    fromPubkey: from.publicKey,
    toPubkey: to,
    lamports: LAMPORTS_PER_SOL * amount,
  });

  transaction.add(instruction);

  try {
    const tempResponse = await sendAndConfirmTransaction(
      connection,
      transaction,
      [from]
    );
    return tempResponse;
  } catch (error) {
    throw new Error("Insufficient funds!");
  }
}
