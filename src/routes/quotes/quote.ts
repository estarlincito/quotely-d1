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
        code: 404,
        message: 'Quote not found.',
        success: false,
      });
    }

    return c.json(quote);
  } catch {
    return ApiResponse.json({
      code: 500,
      message: 'There was an error fetching quote.',
      success: false,
    });
  }
});
