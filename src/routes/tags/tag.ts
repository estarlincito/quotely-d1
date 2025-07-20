import { ApiResponse } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import getPagination from '@/lib/pagination';
import { select } from '@/lib/select';

export const tagRoute = new Hono<{ Bindings: Bindings }>();

tagRoute.get('tag/:id', async (c) => {
  const prisma = client(c.env.DB);
  const { id } = c.req.param();

  //Getting offset and limit
  const url = new URL(c.req.url);
  const isAdmin = c.req.header('Authorization') === c.env.ADMIN_TOKEN;
  const pagination = getPagination(url, isAdmin);

  try {
    const tag = await prisma.tag.findUnique({
      select: select.tag(pagination.offset, pagination.limit),
      where: { name: id },
    });

    if (!tag) {
      return ApiResponse.json({
        code: 404,
        message: 'Tag not found.',
        success: false,
      });
    }

    const count = await prisma.quote.count({
      where: { tags: { some: { name: id } } },
    });

    return c.json({ count, tag });
  } catch {
    return ApiResponse.json({
      code: 500,
      message: 'There was an error fetching tag.',
      success: false,
    });
  }
});
