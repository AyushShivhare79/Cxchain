import transferSolana from "@/app/lib/transfer";
import { PublicKey } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

async function Transfer(req: NextRequest) {
  const { to, amount } = await req.json();

  const toPubkey = new PublicKey(to);

  try {
    await transferSolana(toPubkey, amount);
  } catch {
    return NextResponse.json({ msg: "Error" });
  }

  return NextResponse.json({ msg: "Transfer successful" });
}

export { Transfer as GET, Transfer as POST };
