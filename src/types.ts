import { z } from 'zod';

export type Resolution = 'fullhd' | 'stretch';

const heightSchema = z.number().int().min(1).max(13);
export type Height = z.infer<typeof heightSchema>;

export type AsciiData = boolean[][];
