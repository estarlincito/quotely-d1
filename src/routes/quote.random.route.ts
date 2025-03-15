import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import { zQuotes } from '@/lib/zod';

export const randomQuoteRoute = new Hono<{ Bindings: Bindings }>();

randomQuoteRoute.get('/random', async (c) => {
  const prisma = client(c.env.DB);
  const count = await prisma.quote.count();

  try {
    const random = await prisma.quote.findFirst({
      select: zQuotes.select.quote,
      skip: Math.floor(Math.random() * count),
    });

    return c.json(zQuotes.return.quote.parse(random));
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching random quote.',
      success: false,
    });
  }
});
