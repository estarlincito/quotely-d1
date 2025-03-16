import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import getPagination from '@/lib/pagination';
import { returnSchema } from '@/schemas/return';
import { tagSelect } from '@/schemas/select';

export const tagsRoute = new Hono<{ Bindings: Bindings }>();

tagsRoute.get('/tags', async (c) => {
  const prisma = client(c.env.DB);

  //Getting offset and limit
  const url = new URL(c.req.url);
  const pagination = getPagination(url);

  if (pagination instanceof Response) {
    return pagination;
  }

  try {
    const tags = await prisma.tag.findMany({
      orderBy: { id: 'desc' },
      select: tagSelect(pagination.offset, pagination.limit),
      skip: pagination.offset,
      take: pagination.limit,
    });

    if (tags.length === 0) {
      return resmsg({
        code: 404,
        message: 'Tags not found.',
        success: false,
      });
    }

    const count = await prisma.tag.count();
    const tagsParsed = returnSchema.tags.parse({ count, tags });
    return c.json(tagsParsed);
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching tags.',
      success: false,
    });
  }
});
