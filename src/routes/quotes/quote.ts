import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import { isNumber } from '@/schemas/isNumber';
import { returnSchema } from '@/schemas/return';
import { quoteSelect } from '@/schemas/select';

export const quoteRoute = new Hono<{ Bindings: Bindings }>();

quoteRoute.get('quote/:id', async (c) => {
  const prisma = client(c.env.DB);
  const { id } = c.req.param();

  try {
    const quote = await prisma.quote.findUnique({
      select: quoteSelect,
      where: { id: isNumber.parse(id) },
    });

    if (!quote) {
      return resmsg({
        code: 404,
        message: 'Quote not found.',
        success: false,
      });
    }

    return c.json(returnSchema.quote.parse(quote));
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching quote.',
      success: false,
    });
  }
});
