import { ApiResponse } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import { select } from '@/lib/select';

export const lastQuoteRoute = new Hono<{ Bindings: Bindings }>();

lastQuoteRoute.get('last', async (c) => {
  const prisma = client(c.env.DB);

  try {
    const last = await prisma.quote.findFirst({
      orderBy: { addedAt: 'desc' },
      select: select.quote,
    });

    if (!last) {
      return ApiResponse.json({
        message: 'Last quote not found.',
        status: 404,
        success: false,
      });
    }
    return c.json(last);
  } catch {
    return ApiResponse.json({
      message: 'There was an error fetching last quote.',
      status: 500,
      success: false,
    });
  }
});
