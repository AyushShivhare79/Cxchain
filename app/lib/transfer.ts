// import {
//   Connection,
//   Keypair,
//   LAMPORTS_PER_SOL,
//   PublicKey,
//   sendAndConfirmTransaction,
//   SystemProgram,
//   Transaction,
// } from "@solana/web3.js";

// export default async function (from: Keypair, to: PublicKey, amount: number) {
//   const transaction = new Transaction();

//   const connection = new Connection("http://localhost:8899", "confirmed");

//   const instruction = SystemProgram.transfer({
//     fromPubkey: from.publicKey,
//     toPubkey: to,
//     lamports: LAMPORTS_PER_SOL * amount,
//   });

//   transaction.add(instruction);

//   await sendAndConfirmTransaction(connection, transaction, [from]);

//   console.log("Done");
// }

// const secret = Uint8Array.from([]);
// const fromKeyPair = Keypair.fromSecretKey(secret);

// const toPubkey = new PublicKey("");

// async() => {
//     await airdrop(fromKeyPair.publicKey, amount: 4);
//     const initBalance = await showBalance(fromKeyPair.publicKey);
//     console.log("Initial balance of wallet is: ", initBalance)
//     const initBalanceTo = await showBalance(toPubkey);
//     console.log("Initial balance of to: ", initBalanceTo);

//     await transferSol(fromKeyPair, toPubkey, amount 2);
// }
