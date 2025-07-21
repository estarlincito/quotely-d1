import { Hono } from 'hono';

export const errorRoute = new Hono();

errorRoute.get('error', (c) => {
  return c.json(
    {
      message: 'There was an error in the server.',
      status: 500,
      success: false,
    },
    500,
  );
});
