import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import { zQuotes } from '@/lib/zod';

export const lastQuoteRoute = new Hono<{ Bindings: Bindings }>();

lastQuoteRoute.get('/last', async (c) => {
  const prisma = client(c.env.DB);

  try {
    const last = await prisma.quote.findFirst({
      orderBy: { addedAt: 'desc' },
      select: zQuotes.select.quote,
    });

    return c.json(zQuotes.return.quote.parse(last));
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching last quote.',
      success: false,
    });
  }
});
