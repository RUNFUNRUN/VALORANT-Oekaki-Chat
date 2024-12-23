import { auth } from '@/auth';
import { prisma } from '@/client';
import { artApiSchema } from '@/schemas';
import { flattenArray } from '@/utils';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

export const arts = new Hono()
  .get(
    '/',
    zValidator(
      'query',
      z.object({
        cursor: z.string().optional(),
      }),
    ),
    async (c) => {
      const pageSize = 20;

      const query = c.req.valid('query');
      const cursor = Number.parseInt(query.cursor ?? '0');

      if (Number.isNaN(cursor)) {
        return c.json({}, 400);
      }

      try {
        const artsCount = await prisma.art.count();

        if (cursor > artsCount) {
          return c.json({}, 404);
        }

        const arts = await prisma.art.findMany({
          orderBy: {
            createdAt: 'desc',
          },
          skip: cursor,
          take: pageSize,
        });

        const next = cursor + pageSize < artsCount ? cursor + pageSize : null;

        return c.json({ data: arts, next }, 200);
      } catch {
        return c.json({}, 500);
      }
    },
  )
  .post('/', zValidator('json', artApiSchema), async (c) => {
    const session = await auth();
    if (!session) {
      return c.json({}, 401);
    }

    const account = await prisma.account.findUnique({
      where: { access_token: session.accessToken },
    });
    if (!account) {
      return c.json({}, 401);
    }
    const user = await prisma.user.findUnique({
      where: { id: account.userId },
    });
    if (!user) {
      return c.json({}, 401);
    }

    const art = c.req.valid('json');

    try {
      const result = await prisma.art.create({
        data: {
          userId: user.id,
          title: art.title,
          description: art.description,
          body: flattenArray(art.ascii),
          height: art.height,
        },
      });

      return c.json({ art: result }, 201);
    } catch {
      return c.json({}, 500);
    }
  });
