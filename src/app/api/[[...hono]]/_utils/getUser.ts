import { auth } from '@/auth';
import { prisma } from '@/client';

export const getUser = async () => {
  const session = await auth();
  if (!session) {
    return;
  }

  const account = await prisma.account.findUnique({
    where: { access_token: session.accessToken },
  });
  if (!account) {
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: account.userId },
  });
  if (!user) {
    return;
  }

  return user;
};
