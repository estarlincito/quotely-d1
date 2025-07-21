import { ApiResponse } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import { select } from '@/lib/select';

export const quoteRoute = new Hono<{ Bindings: Bindings }>();

quoteRoute.get('quote/:id', async (c) => {
  const prisma = client(c.env.DB);
  const { id } = c.req.param();

  try {
    const quote = await prisma.quote.findUnique({
      select: select.quote,
      where: { id: parseInt(id) },
    });

    if (!quote) {
      return ApiResponse.json({
        message: 'Quote not found.',
        status: 404,
        success: false,
      });
    }

    return c.json(quote);
  } catch {
    return ApiResponse.json({
      message: 'There was an error fetching quote.',
      status: 500,
      success: false,
    });
  }
});
