import { z } from 'zod';

const quote = z.object({
  addedAt: z.date(),
  id: z.number(),
  quote: z.string(),
  reference: z.string(),
  sourceName: z.object({
    name: z.string(),
  }),
  sourceType: z.object({
    name: z.string(),
  }),
  sourceUrl: z.string(),
});

const author = z.object({
  bio: z.string().nullable().optional(),
  name: z.string(),
});

const tag = z.object({
  name: z.string(),
});

const combinedQuote = quote
  .and(z.object({ tags: z.array(tag) }))
  .and(z.object({ authors: z.array(author) }));

const combinedTag = tag.and(
  z.object({
    quotes: z.array(quote.and(z.object({ authors: z.array(author) }))),
  }),
);

const combinedAuthor = author.and(
  z.object({ quotes: z.array(quote.and(z.object({ tags: z.array(tag) }))) }),
);

export const Return = {
  author: combinedAuthor,
  authors: z.array(combinedAuthor),
  quote: combinedQuote,
  quotes: z.array(combinedQuote),
  tag: combinedTag,
  tags: z.array(combinedTag),
};
