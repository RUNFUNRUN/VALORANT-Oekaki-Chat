import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { arts } from './arts';
import { opinions } from './opinions';
import { users } from './users';

const app = new Hono()
  .basePath('/api')
  .route('/users', users)
  .route('/arts', arts)
  .route('/opinions', opinions);

export type AppType = typeof app;

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
