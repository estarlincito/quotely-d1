import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import getPagination from '@/lib/pagination';
import { zQuotes } from '@/lib/zod';

export const quotesRoute = new Hono<{ Bindings: Bindings }>();

quotesRoute.get(async (c) => {
  const prisma = client(c.env.DB);
  const url = new URL(c.req.url);
  const pagination = getPagination(url);

  if (!pagination.success) {
    return pagination.error;
  }

  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { addedAt: 'desc' },
      select: zQuotes.select.quote,
      skip: pagination.offset,
      take: pagination.limit,
    });

    return c.json(zQuotes.return.quotes.parse(quotes));
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching quotes.',
      success: false,
    });
  }
});
