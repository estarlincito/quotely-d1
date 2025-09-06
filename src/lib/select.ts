export const getSelect = (language = 'en') => ({
  addedAt: true,
  authors: {
    select: {
      avatar: true,
      name: true,
      slug: true,
      translations: {
        select: { bio: true },
        where: { language },
      },
    },
  },
  id: true,
  sourceUrl: true,
  tags: {
    select: {
      slug: true,
      translations: {
        select: { name: true },
        where: { language },
      },
    },
  },
  translations: {
    select: {
      language: true,
      reference: true,
      sourceName: {
        select: {
          translations: { select: { name: true }, where: { language } },
        },
      },
      sourceType: {
        select: {
          translations: { select: { name: true }, where: { language } },
        },
      },
      text: true,
    },
    where: { language },
  },
});
