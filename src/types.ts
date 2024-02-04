import { z } from 'zod';

export type Resolution = 'fullhd' | 'stretch';

const heightSchema = z.number().int().min(1).max(13);
export type Height = z.infer<typeof heightSchema>;

const asciiDataSchema = z.array(z.array(z.boolean()));
export type AsciiData = z.infer<typeof asciiDataSchema>;
