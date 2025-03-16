import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import getPagination from '@/lib/pagination';
import { returnSchema } from '@/schemas/return';
import { quoteSelect } from '@/schemas/select';

export const quotesRoute = new Hono<{ Bindings: Bindings }>();

quotesRoute.get(async (c) => {
  const prisma = client(c.env.DB);
  //Getting offset and limit
  const url = new URL(c.req.url);
  const pagination = getPagination(url);

  if (pagination instanceof Response) {
    return pagination;
  }

  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { addedAt: 'desc' },
      select: quoteSelect,
      skip: pagination.offset,
      take: pagination.limit,
    });

    if (quotes.length === 0) {
      return resmsg({
        code: 404,
        message: 'Quotes not found.',
        success: false,
      });
    }

    const count = await prisma.quote.count();
    const parsedQuotes = returnSchema.quotes.parse({ count, quotes });
    return c.json(parsedQuotes);
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching quotes.',
      success: false,
    });
  }
});
