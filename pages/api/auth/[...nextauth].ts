import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";

import prisma from "@/lib/prismadb";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // adapter: PrismaAdapter(prisma) ,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPass) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPass = await bcrypt.compare(
          credentials?.password,
          user.hashedPass
        );

        if (!isCorrectPass) {
          throw new Error("Invalid credentials");
        }
        // const user = {id: '1', name: 'Mohamed kandad'};
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV !== "production",
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
