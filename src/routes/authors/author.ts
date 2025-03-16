import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import getPagination from '@/lib/pagination';
import { returnSchema } from '@/schemas/return';
import { authorSelect } from '@/schemas/select';

export const authorRoute = new Hono<{ Bindings: Bindings }>();

authorRoute.get('/authors/:id', async (c) => {
  const { id } = c.req.param();

  const prisma = client(c.env.DB);

  //Getting offset and limit
  const url = new URL(c.req.url);
  const pagination = getPagination(url);

  if (pagination instanceof Response) {
    return pagination;
  }

  try {
    const author = await prisma.author.findUnique({
      select: authorSelect(pagination.offset, pagination.limit),
      where: { name: id },
    });

    if (!author) {
      return resmsg({
        code: 404,
        message: 'Author not found.',
        success: false,
      });
    }
    const count = await prisma.quote.count({
      where: { authors: { some: { name: id } } },
    });

    return c.json(returnSchema.author.parse({ author, count }));
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching author.',
      success: false,
    });
  }
});
