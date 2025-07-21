import { ApiResponse } from '@estarlincito/utils';
import { Hono } from 'hono';

import { client } from '@/lib/client';
import getPagination from '@/lib/pagination';
import { select } from '@/lib/select';

export const authorRoute = new Hono<{ Bindings: Bindings }>();

authorRoute.get('author/:id', async (c) => {
  const { id } = c.req.param();
  const prisma = client(c.env.DB);

  //Getting offset and limit
  const url = new URL(c.req.url);
  const isAdmin = c.req.header('Authorization') === c.env.ADMIN_TOKEN;
  const pagination = getPagination(url, isAdmin);

  try {
    const author = await prisma.author.findUnique({
      select: select.author(pagination.offset, pagination.limit),
      where: { slug: id },
    });

    if (!author) {
      return ApiResponse.json({
        message: 'Author not found.',
        status: 404,
        success: false,
      });
    }
    const count = await prisma.quote.count({
      where: { authors: { some: { slug: id } } },
    });

    return c.json({ author, count });
  } catch {
    return ApiResponse.json({
      message: 'There was an error fetching author.',
      status: 500,
      success: false,
    });
  }
});
