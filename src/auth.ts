import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { prisma } from '@/client';
import authConfig from './auth.config';

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
        token.id = account.id;
      }
      return token;
    },
  },
  ...authConfig,
});
