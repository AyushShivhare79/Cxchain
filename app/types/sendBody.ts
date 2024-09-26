import { z } from "zod";
const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;

export const sendBody = z.object({
  toAddress: z.string().regex(base58Regex, "Please enter valid address!"),
  amount: z
    .string()
    .regex(/^(?!0(\.0+)?$)\d*\.?\d+$/, "Please enter valid amount!")
    .transform((val) => parseFloat(val)),
});

export type SendBody = z.TypeOf<typeof sendBody>;
