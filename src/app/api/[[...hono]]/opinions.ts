import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

export const opinions = new Hono().post(
  '/',
  zValidator(
    'json',
    z.object({
      message: z.string().max(1992),
    }),
  ),
  async (c) => {
    const json = c.req.valid('json');
    const content = json.message;
    try {
      if (!process.env.DISCORD_WEBHOOK_URL) {
        throw new Error('DISCORD_WEBHOOK_URL is not defined');
      }
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'valorant-oekaki-chat opinion box',
          content: `\`\`\`\n${content}\n\`\`\``,
        }),
      });
      return c.status(201);
    } catch {
      return c.status(500);
    }
  },
);
