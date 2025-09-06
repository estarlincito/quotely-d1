import { Resuponsu } from 'resuponsu';

import { client } from '@/lib/client';
import { getSelect } from '@/lib/select';
import { serializeQuote } from '@/lib/serialize';

export const quotes = async (c: C) => {
  const prisma = client(c.env.DB);
  const language = c.req.headers.get('Accept-Language') ?? 'en';
  const page = parseInt(c.req.headers.get('X-Page') ?? '1', 10);
  const take = 6;

  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { addedAt: 'desc' },
      select: getSelect(language),
      skip: (page - 1) * take,
      take,
    });

    if (quotes.length === 0) {
      return Resuponsu.json({
        message: 'Quotes not found.',
        status: 404,
        success: false,
      });
    }

    return Response.json(serializeQuote(quotes));
  } catch {
    return Resuponsu.json({
      message: 'There was an error fetching quotes.',
      status: 500,
      success: false,
    });
  }
};
