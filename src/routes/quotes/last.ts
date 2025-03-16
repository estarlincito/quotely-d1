import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import { returnSchema } from '@/schemas/return';
import { quoteSelect } from '@/schemas/select';

export const lastQuoteRoute = new Hono<{ Bindings: Bindings }>();

lastQuoteRoute.get('/last', async (c) => {
  const prisma = client(c.env.DB);

  try {
    const last = await prisma.quote.findFirst({
      orderBy: { addedAt: 'desc' },
      select: quoteSelect,
    });

    if (!last) {
      return resmsg({
        code: 404,
        message: 'Last quote not found.',
        success: false,
      });
    }
    return c.json(returnSchema.quote.parse(last));
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching last quote.',
      success: false,
    });
  }
});
