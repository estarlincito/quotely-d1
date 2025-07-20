/* eslint-disable prettier/prettier */
const base = {
  addedAt: true,
  authors: { select: { bio: true, id: true, name: true, slug: true } },
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
  tags: { select: { id: true, name: true } },
};

const tag = (offset: number, limit: number) =>
  ({
    id: true,
    name: true,
    quotes: {
      orderBy: { id: 'desc' },
      select: base,
      skip: offset,
      take: limit,
    },
  } as const);

const author = (offset = 0, limit = 6) =>
  ({
    bio: true,
    id: true,
    name: true,
    quotes: {
      orderBy: { id: 'desc' },
      select: base,
      skip: offset,
      take: limit,
    },
    slug: true,
  } as const);

export const select = { author, quote: base, tag };
