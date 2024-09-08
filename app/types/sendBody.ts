import { z } from "zod";
import bs58 from "bs58";

const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;

export const sendBody = z.object({
  //Support decimal amount

  toAddress: z.string().regex(base58Regex, "Please enter valid address"),
  amount: z.coerce.number().gte(1, { message: "Please enter valid amount" }),
});

export type SendBody = z.TypeOf<typeof sendBody>;
