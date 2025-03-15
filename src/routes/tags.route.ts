import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import getPagination from '@/lib/pagination';
import { zQuotes } from '@/lib/zod';

export const tagsRoute = new Hono<{ Bindings: Bindings }>();

tagsRoute.get('/tags', async (c) => {
  const prisma = client(c.env.DB);

  const url = new URL(c.req.url);
  const pagination = getPagination(url);

  if (!pagination.success) {
    return pagination.error;
  }

  try {
    const tags = await prisma.tag.findMany({
      orderBy: { id: 'desc' },
      select: zQuotes.select.tags,
      skip: pagination.offset,
      take: pagination.limit,
    });

    return c.json(zQuotes.return.tags.parse(tags));
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching tags.',
      success: false,
    });
  }
});
