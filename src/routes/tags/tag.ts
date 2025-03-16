import { resmsg } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import getPagination from '@/lib/pagination';
import { returnSchema } from '@/schemas/return';
import { tagSelect } from '@/schemas/select';

export const tagRoute = new Hono<{ Bindings: Bindings }>();

tagRoute.get('/tags/:id', async (c) => {
  const prisma = client(c.env.DB);
  const { id } = c.req.param();

  //Getting offset and limit
  const url = new URL(c.req.url);
  const pagination = getPagination(url);

  if (pagination instanceof Response) {
    return pagination;
  }

  try {
    const tag = await prisma.tag.findUnique({
      select: tagSelect(pagination.offset, pagination.limit),
      where: { name: id },
    });

    if (!tag) {
      return resmsg({
        code: 404,
        message: 'Tag not found.',
        success: false,
      });
    }

    const count = await prisma.quote.count({
      where: { tags: { some: { name: id } } },
    });

    return c.json(returnSchema.tag.parse({ count, tag }));
  } catch {
    return resmsg({
      code: 500,
      message: 'There was an error fetching tag.',
      success: false,
    });
  }
});
