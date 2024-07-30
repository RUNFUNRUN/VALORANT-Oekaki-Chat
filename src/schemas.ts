import { z } from 'zod';

export const heightSchema = z.number().int().min(1).max(13);

export const shareArtSchema = z.object({
  title: z.string().min(3).max(12),
  description: z.string().max(50),
  ascii: z.boolean().array().array(),
  width: z.number(),
  height: z.number(),
});
