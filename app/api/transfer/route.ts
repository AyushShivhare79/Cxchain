import transferSolana from "@/app/lib/transfer";
import { PublicKey } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";
import { sendBody } from "../../types/sendBody";

async function Transfer(req: NextRequest) {
  const userInfo = await req.json();

  // const { success } = sendBody.safeParse(userInfo);
  // if (!success) {
  //   return NextResponse.json({ msg: "Invalid credentials!" });
  // }
  const { toAddress, amount } = userInfo;

  try {
    const toPubkey = new PublicKey(toAddress);
    const response = await transferSolana(toPubkey, amount);
    return NextResponse.json({
      msg: "Transfer successful!",
      Signature: response,
    });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message });
  }
}

export { Transfer as GET, Transfer as POST };
