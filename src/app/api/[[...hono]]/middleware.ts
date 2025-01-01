import type { User } from '@prisma/client';
import { createMiddleware } from 'hono/factory';
import { getUser } from './_utils/getUser';

export const sessionMiddleware = createMiddleware<{
  Variables: {
    session: User;
  };
}>(async (c, next) => {
  try {
    const user = await getUser();
    if (!user) {
      return c.json({}, 401);
    }
    c.set('session', user);
    await next();
  } catch {
    return c.json({}, 500);
  }
});
