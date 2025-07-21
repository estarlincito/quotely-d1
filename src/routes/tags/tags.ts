import { ApiResponse } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import getPagination from '@/lib/pagination';
import { select } from '@/lib/select';

export const tagsRoute = new Hono<{ Bindings: Bindings }>();

tagsRoute.get('tags', async (c) => {
  const prisma = client(c.env.DB);

  //Getting offset and limit
  const url = new URL(c.req.url);
  const isAdmin = c.req.header('Authorization') === c.env.ADMIN_TOKEN;
  const pagination = getPagination(url, isAdmin);

  try {
    const tags = await prisma.tag.findMany({
      orderBy: { id: 'desc' },
      select: select.tag(pagination.offset, pagination.limit),
      skip: pagination.offset,
      take: pagination.limit,
    });

    if (tags.length === 0) {
      return ApiResponse.json({
        message: 'Tags not found.',
        status: 404,
        success: false,
      });
    }

    const count = await prisma.tag.count();
    return c.json({ count, tags });
  } catch {
    return ApiResponse.json({
      message: 'There was an error fetching tags.',
      status: 500,
      success: false,
    });
  }
});
