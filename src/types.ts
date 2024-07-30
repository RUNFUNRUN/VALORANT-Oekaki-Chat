import type { z } from 'zod';
import type { heightSchema } from './schemas';

export type Resolution = 'fullhd' | 'stretched';

export type DrawingMode = 'click' | 'drag';

export type DragMode = 'pen' | 'eraser';

export type Height = z.infer<typeof heightSchema>;

export type AsciiData = boolean[][];

export type OpinionBoxData = {
  content: string;
};

export type OpinionBoxResponse = {
  success: boolean;
  error?: unknown;
};

export type ShareArtResponse = {
  success: boolean;
  slug?: string;
  error?: unknown;
};
