import { z } from 'zod';

import { quoteSelect, quoteSelectSchema } from './quote';

const tagSelectSchema = z.object({
  name: z.boolean(),
  quotes: z.object({
    orderBy: z.object({ id: z.literal('desc') }),
    select: quoteSelectSchema,
    skip: z.number(),
    take: z.number(),
  }),
});

export const tagSelect = (offset: number, limit: number) => {
  const tag: z.infer<typeof tagSelectSchema> = {
    name: true,
    quotes: {
      orderBy: { id: 'desc' },
      select: quoteSelect,
      skip: offset,
      take: limit,
    },
  };

  return tagSelectSchema.parse(tag);
};
