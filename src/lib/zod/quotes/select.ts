import { ObjectUtils } from '@estarlincito/utils';
import { z } from 'zod';
const zTags_ = z.object({ select: z.object({ name: z.boolean() }) });

const zAuthors_ = z.object({
  select: z.object({ bio: z.boolean(), name: z.boolean() }),
});

const zQuote = z.object({
  addedAt: z.boolean(),
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
});

const combinedQuote = zQuote
  .and(z.object({ authors: zAuthors_ }))
  .and(z.object({ tags: zTags_ }));

const quote: z.infer<typeof combinedQuote> = {
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

//Tags
const zTags = z.object({
  name: z.boolean(),
  quotes: z.object({ select: zQuote.and(z.object({ authors: zAuthors_ })) }),
});

const tags: z.infer<typeof zTags> = {
  name: true,
  quotes: { select: ObjectUtils.removeKeys(quote, 'tags') },
};
//author
const zAuthors = z.object({
  bio: z.boolean(),
  name: z.boolean(),
  quotes: z.object({ select: zQuote.and(z.object({ tags: zTags_ })) }),
});

const authors: z.infer<typeof zAuthors> = {
  bio: true,
  name: true,
  quotes: { select: ObjectUtils.removeKeys(quote, 'authors') },
};

export const select = {
  authors: zAuthors.parse(authors),
  quote: combinedQuote.parse(quote),
  tags: zTags.parse(tags),
};
