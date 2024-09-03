import transferSolana from "@/app/lib/transfer";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";
async function Transfer(req: NextRequest) {
  const { from, to, amount } = await req.json();

  const secret = Uint8Array.from(from);
  const fromKeyPair = Keypair.fromSecretKey(secret);

  const toPubkey = new PublicKey(to);

  try {
    await transferSolana(fromKeyPair, toPubkey, amount);
  } catch {
    return NextResponse.json({ msg: "Error" });
  }

  return NextResponse.json({ msg: "Transfer successful" });
}
// async function Transfer(req: NextRequest) {
//   // from: Keypair,
//   // to: PublicKey,
//   // amount: number
//   const { from, fromPublicKey, to, amount } = await req.json();

//   const transaction = new Transaction();

//   const connection = new Connection(
//     "https://api.devnet.solana.com",
//     "confirmed"
//   );

//   const instruction = SystemProgram.transfer({
//     fromPubkey: fromPublicKey,
//     toPubkey: to,
//     lamports: LAMPORTS_PER_SOL * amount,
//   });

//   transaction.add(instruction);

//   console.log("HERE: ");
//   await sendAndConfirmTransaction(connection, transaction, [from]);

//   console.log("Done");

//   // const secret = Uint8Array.from([
//   //   114, 119, 161, 25, 212, 96, 147, 185, 3, 175, 205, 151, 19, 7, 112, 162, 220,
//   //   253, 204, 16, 108, 244, 4, 99, 100, 56, 18, 45, 177, 207, 72, 218, 28, 178, 4,
//   //   172, 55, 135, 216, 119, 196, 33, 110, 29, 143, 189, 6, 82, 114, 191, 243, 15,
//   //   118, 116, 142, 20, 65, 143, 214, 94, 142, 204, 184, 50,
//   // ]);

//   const secret = Uint8Array.from(from);
//   console.log("Secret: ", secret);
//   return;
// }

// //   const fromKeyPair = Keypair.fromSecretKey(secret);
// //   const toPubkey = new PublicKey("JBbLJce6qdNDKp1XSpB9dnNiVrxW7YVWcLVwcZy6jHQX");

// //   async () => {
// //     // await airdrop(fromKeyPair.publicKey, amount: 4);
// //     // const initBalance = await showBalance(fromKeyPair.publicKey);
// //     // console.log("Initial balance of wallet is: ", initBalance)
// //     // const initBalanceTo = await showBalance(toPubkey);
// //     // console.log("Initial balance of to: ", initBalanceTo);

// //     await transferSol(fromKeyPair, toPubkey, 1);

// // };

export { Transfer as GET, Transfer as POST };
