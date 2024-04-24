import { connectDB } from "@/libs/mongodb";

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { AUTH_PAGES } from "@/constants/common";
import { signWithPassword, validateGoogleSign } from "@/actions/user.actions";
import { UserDocument } from "@/types/types";


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },

    ),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const result: UserDocument | any = await signWithPassword({ email: credentials!!.email, sendedPassword: credentials?.password })

          if (!result) {
            throw new Error('Desculpe, não foi possível encontrar um usuário com as credenciais fornecidas. Tente novamente.')
          }

          return result
        } catch (error: Error | any) {
          throw new Error(error.message ?? error);
        }

      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session, profile, account }: any) {
      if (profile && account?.provider === 'google') {
        user = await validateGoogleSign({ profile })
      }

      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
