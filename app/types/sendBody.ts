import { z } from "zod";

export const sendBody = z.object({
  //Please fix validation for publicKey
  address: z.string().min(20, { message: "Please enter valid address" }),
  // amount: z.string().min(1, { message: "Invalid amount" }),
  amount: z.coerce
    .number()
    .int()
    .gte(1, { message: "Please enter valid amount" }),
});

export type SendBody = z.TypeOf<typeof sendBody>;
