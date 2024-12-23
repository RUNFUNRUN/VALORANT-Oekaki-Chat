import type { z } from 'zod';
import type { heightSchema } from './schemas';

export type DrawingMode = 'click' | 'drag';

export type DragMode = 'pen' | 'eraser';

export type Height = z.infer<typeof heightSchema>;

export type AsciiData = boolean[][];
