import { prisma } from '@/client';
import { artApiSchema } from '@/schemas';
import { flattenArray } from '@/utils';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { getUser } from './_utils/getUser';
import { sessionMiddleware } from './middleware';

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
        const user = await getUser();

        const artCount = await prisma.art.count();

        if (cursor > artCount) {
          return c.json({}, 404);
        }

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
            _count: { select: { favorites: true, comments: true } },
          },
          orderBy:
            sort === 'new'
              ? { createdAt: 'desc' }
              : { favorites: { _count: 'desc' } },
          skip: cursor,
          take: pageSize,
        });

        const next = cursor + pageSize < artCount ? cursor + pageSize : null;

        return c.json({ data: arts, next }, 201);
      } catch {
        return c.json({}, 500);
      }
    },
  )
  .post('/', sessionMiddleware, zValidator('json', artApiSchema), async (c) => {
    const art = c.req.valid('json');
    const user = c.var.session;

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
  })
  .get('/:id', async (c) => {})
  .post('/:id/favorite', sessionMiddleware, async (c) => {
    const user = c.var.session;
    const artId = c.req.param('id');
    try {
      const art = await prisma.favorite.findUnique({
        where: { artId_userId: { artId, userId: user.id } },
      });
      if (!art) {
        return c.status(404);
      }

      const favorite = await prisma.favorite.findUnique({
        where: { artId_userId: { artId, userId: user.id } },
      });
      if (!favorite) {
        return c.status(409);
      }

      await prisma.favorite.create({
        data: {
          userId: user.id,
          artId,
        },
      });
      return c.status(201);
    } catch {
      return c.status(500);
    }
  })
  .delete('/:id/favorite', sessionMiddleware, async (c) => {
    const user = c.var.session;
    const artId = c.req.param('id');
    try {
      const art = await prisma.favorite.findUnique({
        where: { artId_userId: { artId, userId: user.id } },
      });
      if (!art) {
        return c.status(404);
      }

      const favorite = await prisma.favorite.findUnique({
        where: { artId_userId: { artId, userId: user.id } },
      });
      if (!favorite) {
        return c.status(404);
      }

      await prisma.favorite.delete({
        where: { artId_userId: { artId, userId: user.id } },
      });
      return c.status(204);
    } catch {
      return c.status(500);
    }
  });
