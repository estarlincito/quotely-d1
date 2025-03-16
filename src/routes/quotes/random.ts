import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import { returnSchema } from '@/schemas/return';
import { quoteSelect } from '@/schemas/select';

export const randomQuoteRoute = new Hono<{ Bindings: Bindings }>();

randomQuoteRoute.get('/random', async (c) => {
  const prisma = client(c.env.DB);
  const count = await prisma.quote.count();

  try {
    const random = await prisma.quote.findFirst({
      select: quoteSelect,
      skip: Math.floor(Math.random() * count),
    });

    if (!random) {
      return resmsg({
        code: 404,
        message: 'Random quote not found.',
        success: false,
      });
    }

    return c.json(returnSchema.quote.parse(random));
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching random quote.',
      success: false,
    });
  }
});
