import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import { zQuotes } from '@/lib/zod';

export const tagRoute = new Hono<{ Bindings: Bindings }>();

tagRoute.get('/tags/:id', async (c) => {
  const prisma = client(c.env.DB);
  const { id } = c.req.param();

  try {
    const tag = await prisma.tag.findUnique({
      select: zQuotes.select.tags,
      where: { name: id },
    });

    return c.json(zQuotes.return.tag.parse(tag));
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching tag.',
      success: false,
    });
  }
});
