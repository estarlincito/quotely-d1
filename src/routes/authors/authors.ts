import { ApiResponse } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import getPagination from '@/lib/pagination';
import { select } from '@/lib/select';

export const authorsRoute = new Hono<{ Bindings: Bindings }>();

authorsRoute.get('authors', async (c) => {
  const prisma = client(c.env.DB);

  //Getting offset and limit
  const url = new URL(c.req.url);
  const isAdmin = c.req.header('Authorization') === c.env.ADMIN_TOKEN;
  const pagination = getPagination(url, isAdmin);

  try {
    const authors = await prisma.author.findMany({
      select: select.author(),
      skip: pagination.offset,
      take: pagination.limit,
    });

    if (authors.length === 0) {
      return ApiResponse.json({
        message: 'Authors not found.',
        status: 404,
        success: false,
      });
    }

    const count = await prisma.author.count();
    return c.json({ authors, count });
  } catch {
    return ApiResponse.json({
      message: 'There was an error fetching authors.',
      status: 500,
      success: false,
    });
  }
});
