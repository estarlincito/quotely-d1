import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import { zQuotes } from '@/lib/zod';

export const authorRoute = new Hono<{ Bindings: Bindings }>();

authorRoute.get('/authors/:id', async (c) => {
  const { id } = c.req.param();

  const prisma = client(c.env.DB);

  try {
    const author = await prisma.author.findUnique({
      select: zQuotes.select.authors,
      where: { name: id },
    });
    // if (!author) {
    //   return resmsg({
    //     code: 404,
    //     message: 'Author not found.',
    //     success: false,
    //   });
    // }
    return c.json(zQuotes.return.author.parse(author));
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching author.',
      success: false,
    });
  }
});
