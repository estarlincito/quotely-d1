import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import getPagination from '@/lib/pagination';
import { returnSchema } from '@/schemas/return';
import { authorSelect } from '@/schemas/select';

export const authorsRoute = new Hono<{ Bindings: Bindings }>();

authorsRoute.get('/authors', async (c) => {
  const prisma = client(c.env.DB);

  //Getting offset and limit
  const url = new URL(c.req.url);
  const pagination = getPagination(url);

  if (pagination instanceof Response) {
    return pagination;
  }

  try {
    const authors = await prisma.author.findMany({
      select: authorSelect(pagination.offset, pagination.limit),
      skip: pagination.offset,
      take: pagination.limit,
    });

    if (authors.length === 0) {
      return resmsg({
        code: 404,
        message: 'Authors not found.',
        success: false,
      });
    }

    const count = await prisma.author.count();
    const parsedAuthors = returnSchema.authors.parse({ authors, count });
    return c.json(parsedAuthors);
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching authors.',
      success: false,
    });
  }
});
