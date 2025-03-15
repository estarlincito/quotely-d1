import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import getPagination from '@/lib/pagination';
import { zQuotes } from '@/lib/zod';

export const authorsRoute = new Hono<{ Bindings: Bindings }>();

authorsRoute.get('/authors', async (c) => {
  const prisma = client(c.env.DB);

  const url = new URL(c.req.url);
  const pagination = getPagination(url);

  if (!pagination.success) {
    return pagination.error;
  }

  try {
    const authors = await prisma.author.findMany({
      select: zQuotes.select.authors,
      skip: pagination.offset,
      take: pagination.limit,
    });

    return c.json(zQuotes.return.authors.parse(authors));
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching authors.',
      success: false,
    });
  }
});
