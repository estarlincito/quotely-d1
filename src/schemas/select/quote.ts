import { z } from 'zod';

export const quoteSelectSchema = z.object({
  addedAt: z.boolean(),
  authors: z.object({
    select: z.object({ bio: z.boolean(), name: z.boolean() }),
  }),
  id: z.boolean(),
  quote: z.boolean(),
  reference: z.boolean(),
  sourceName: z.object({
    select: z.object({
      name: z.boolean(),
    }),
  }),
  sourceType: z.object({
    select: z.object({
      name: z.boolean(),
    }),
  }),
  sourceUrl: z.boolean(),
  tags: z.object({ select: z.object({ name: z.boolean() }) }),
});

export const quoteSelect: z.infer<typeof quoteSelectSchema> = {
  addedAt: true,
  authors: { select: { bio: true, name: true } },
  id: true,
  quote: true,
  reference: true,
  sourceName: {
    select: {
      name: true,
    },
  },
  sourceType: {
    select: {
      name: true,
    },
  },
  sourceUrl: true,
  tags: { select: { name: true } },
};
