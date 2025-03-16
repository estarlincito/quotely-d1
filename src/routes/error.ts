import { Hono } from 'hono';

export const errorRoute = new Hono();

errorRoute.get('error', (c) => {
  return c.json(
    {
      code: 500,
      message: 'There was an error in the server.',
      success: false,
    },
    500,
  );
});
