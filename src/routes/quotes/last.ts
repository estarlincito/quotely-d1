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
        code: 404,
        message: 'Last quote not found.',
        success: false,
      });
    }
    return c.json(last);
  } catch {
    return ApiResponse.json({
      code: 500,
      message: 'There was an error fetching last quote.',
      success: false,
    });
  }
});
