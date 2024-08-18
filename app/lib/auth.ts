import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { Keypair, PublicKey } from "@solana/web3.js";
import { NextResponse } from "next/server";

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
      const keypair = Keypair.generate();
      console.log("keyPair: ", keypair);

      const publicKey = keypair.publicKey.toBase58();
      const privateKey = keypair.secretKey;
      const response = await prisma.user.create({
        data: {
          username: user?.email,
          image: user?.image,
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
      // return {
      //   // id: userExist.id.toString(),

      //   publicKey: publicKey,
      //   name: user?.name,
      //   email: user?.email,
      //   image: user?.image,

      //   // name: userExist.firstName,
      //   // email: userExist.username,
      // };
    },

    async session({ token, session }: any) {
      console.log("Token: ", token);

      const response = await prisma.user.findFirst({
        where: {
          username: session?.user?.email,
        },
        include: {
          solwallet: true,
        },
      });
      session.user.publicKey = response?.solwallet[0].publicKey;
      console.log("Custom session: ", session.user.publicKey);
      return session;
    },
  },
};

export default authOptions;
