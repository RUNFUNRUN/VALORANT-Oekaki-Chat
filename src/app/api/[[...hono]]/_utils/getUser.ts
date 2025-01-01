import { auth } from '@/auth';
import { prisma } from '@/client';

export const getUser = async () => {
  const session = await auth();
  if (!session) {
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) {
    return;
  }

  return user;
};
