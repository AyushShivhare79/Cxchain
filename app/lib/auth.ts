import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { Keypair } from "@solana/web3.js";

const prisma = new PrismaClient();

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      const userInfo = await prisma.user.findFirst({
        where: {
          username: user?.email,
        },
      });

      if (userInfo) return true;

      const keypair = Keypair.generate();

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

      return true;
    },

    async session({ token, session }: any) {
      const response = await prisma.user.findFirst({
        where: {
          username: session?.user?.email,
        },
        include: {
          solwallet: true,
        },
      });
      session.user.publicKey = response?.solwallet[0].publicKey;
      return session;
    },
  },
};

export default authOptions;
