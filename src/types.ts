import { z } from 'zod';

export type Resolution = 'fullhd' | 'stretched';

export type DrawingMode = 'click' | 'drag';

export type DragMode = 'pen' | 'eraser';

const heightSchema = z.number().int().min(1).max(13);
export type Height = z.infer<typeof heightSchema>;

export type AsciiData = boolean[][];

export type OpinionBoxData = {
  content: string;
};

export type OpinionBoxResponse = {
  success: boolean;
  error?: unknown;
};
