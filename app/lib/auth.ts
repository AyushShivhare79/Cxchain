import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { Keypair, PublicKey } from "@solana/web3.js";

const prisma = new PrismaClient();

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.JWT_SECRET,

  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      console.log({ user, account, profile, email, credentials });

      const keypair = Keypair.generate();
      console.log("keyPair: ", keypair);

      const publicKey = keypair.publicKey.toBase58();
      const privateKey = keypair.secretKey;

      console.log("publicKey", publicKey);
      console.log("privateKey", privateKey);

      const response = await prisma.user.create({
        data: {
          username: user?.email,
          image: user?.image,

          //    Converting privateKey to string so whenever you are using make sure to make it Uint8Array(64)

          solwallet: {
            create: {
              publicKey,
              privateKey: privateKey.toString(),
            },
          },
        },
      });
      console.log("Response: ", response);

      return true;
    },
  },
};

export default authOptions;
