import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const airdrop = async (address: string, amount: number) => {
  const publicKey = new PublicKey(address);
  const conn = new Connection("https://api.devnet.solana.com", "confirmed");
  const signature = await conn.requestAirdrop(
    publicKey,
    amount * LAMPORTS_PER_SOL
  );
  await conn.confirmTransaction(signature);
};

airdrop("2w1rdrSqHb4uLM9YQzr4SsnDTZCt9hQnTQiKWs5yAYBj", 5);
