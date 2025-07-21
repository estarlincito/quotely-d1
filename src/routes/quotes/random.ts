import { ApiResponse } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import { select } from '@/lib/select';

export const randomQuoteRoute = new Hono<{ Bindings: Bindings }>();

randomQuoteRoute.get('random', async (c) => {
  const prisma = client(c.env.DB);
  const count = await prisma.quote.count();

  try {
    const random = await prisma.quote.findFirst({
      select: select.quote,
      skip: Math.floor(Math.random() * count),
    });

    if (!random) {
      return ApiResponse.json({
        message: 'Random quote not found.',
        status: 404,
        success: false,
      });
    }

    return c.json(random);
  } catch {
    return ApiResponse.json({
      message: 'There was an error fetching random quote.',
      status: 500,
      success: false,
    });
  }
});
