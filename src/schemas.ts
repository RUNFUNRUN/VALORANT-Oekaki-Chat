import { z } from 'zod';

export const heightSchema = z.number().int().min(1).max(13);

export const artApiSchema = z.object({
  title: z.string().min(3).max(12),
  description: z.string().max(100).optional(),
  ascii: z.boolean().array().array(),
  height: heightSchema,
});

export const artSchema = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.string().transform((str) => new Date(str)),
});
