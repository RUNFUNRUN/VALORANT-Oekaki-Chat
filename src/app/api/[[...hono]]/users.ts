import { prisma } from '@/client';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

export const users = new Hono()
  // .get('/:id', async (c) => {})
  .get(
    '/:id/favorites',
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

      const userId = c.req.param('id');

      try {
        const favoriteCount = await prisma.favorite.count({
          where: { userId },
        });

        if (cursor > favoriteCount) {
          return c.json({}, 404);
        }

        const favorites = await prisma.favorite.findMany({
          relationLoadStrategy: 'join',
          where: {
            userId,
          },
          select: {
            art: {
              select: {
                id: true,
                createdAt: true,
                title: true,
                description: true,
                body: true,
                height: true,
                user: { select: { id: true, name: true } },
                _count: { select: { favorites: true, comments: true } },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          skip: cursor,
          take: pageSize,
        });

        const next =
          cursor + pageSize < favoriteCount ? cursor + pageSize : null;

        return c.json({ data: favorites, next }, 200);
      } catch {
        return c.json({}, 500);
      }
    },
  );
