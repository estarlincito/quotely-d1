import { z } from 'zod';

import { quoteSelect, quoteSelectSchema } from './quote';

const authorSelectSchema = z.object({
  bio: z.boolean(),
  name: z.boolean(),
  quotes: z.object({
    orderBy: z.object({ id: z.literal('desc') }),
    select: quoteSelectSchema,
    skip: z.number(),
    take: z.number(),
  }),
});

export const authorSelect = (offset: number, limit: number) => {
  const author: z.infer<typeof authorSelectSchema> = {
    bio: true,
    name: true,
    quotes: {
      orderBy: { id: 'desc' },
      select: quoteSelect,
      skip: offset,
      take: limit,
    },
  };

  return authorSelectSchema.parse(author);
};
