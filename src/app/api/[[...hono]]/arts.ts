import { prisma } from '@/client';
import { artApiSchema } from '@/schemas';
import { flattenArray } from '@/utils';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { getUser } from './_utils/getUser';

export const arts = new Hono()
  .get(
    '/',
    zValidator(
      'query',
      z.object({
        cursor: z.string().optional(),
        sort: z.enum(['new', 'favorites']).default('new'),
      }),
    ),
    async (c) => {
      const pageSize = 20;

      const query = c.req.valid('query');
      const cursor = Number.parseInt(query.cursor ?? '0');
      const sort = query.sort;

      if (Number.isNaN(cursor)) {
        return c.json({}, 400);
      }

      try {
        const artsCount = await prisma.art.count();

        if (cursor > artsCount) {
          return c.json({}, 404);
        }

        const user = await getUser();

        const arts = await prisma.art.findMany({
          relationLoadStrategy: 'join',
          select: {
            id: true,
            createdAt: true,
            title: true,
            description: true,
            body: true,
            height: true,
            user: { select: { id: true, name: true } },
            favorites: {
              where: {
                userId: user?.id,
              },
              select: {
                id: true,
              },
            },
            comments: {
              select: {
                id: true,
                user: { select: { id: true, name: true } },
                content: true,
                createdAt: true,
              },
            },
            _count: { select: { favorites: true, comments: true } },
          },
          orderBy:
            sort === 'new'
              ? { createdAt: 'desc' }
              : { favorites: { _count: 'desc' } },
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
    const user = await getUser();
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
