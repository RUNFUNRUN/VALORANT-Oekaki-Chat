import { prisma } from '@/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import authConfig from './auth.config';
import 'next-auth/jwt';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  ...authConfig,
});

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}
