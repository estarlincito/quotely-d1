import { ApiResponse } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import getPagination from '@/lib/pagination';
import { select } from '@/lib/select';

export const quotesRoute = new Hono<{ Bindings: Bindings }>();

quotesRoute.get('quotes', async (c) => {
  const url = new URL(c.req.url);
  const isAdmin = c.req.header('Authorization') === c.env.ADMIN_TOKEN;
  const pagination = getPagination(url, isAdmin);
  const prisma = client(c.env.DB);

  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { addedAt: 'desc' },
      select: select.quote,
      skip: pagination.offset,
      take: pagination.limit,
    });

    if (quotes.length === 0) {
      return ApiResponse.json({
        code: 404,
        message: 'Quotes not found.',
        success: false,
      });
    }

    const count = await prisma.quote.count();

    return c.json({ count, quotes });
  } catch {
    return ApiResponse.json({
      code: 500,
      message: 'There was an error fetching quotes.',
      success: false,
    });
  }
});
