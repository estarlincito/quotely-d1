export interface QuoteReturn {
  authors: {
    translations: {
      bio: string | null;
    }[];
    avatar: string;
    name: string;
    slug: string;
  }[];
  sourceUrl: string;
  translations: {
    sourceName: {
      translations: {
        name: string;
      }[];
    };
    sourceType: {
      translations: {
        name: string;
      }[];
    };
    text: string;
    reference: string | null;
    language: string;
  }[];
  tags: {
    translations: {
      name: string;
    }[];
    slug: string;
  }[];
  addedAt: Date;
  id: number;
}

export const serializeQuote = (quotes: QuoteReturn[]) =>
  quotes.map(({ authors, translations, tags, ...rest }) => {
    const { sourceName, sourceType, text, ...restTranslations } =
      translations[0];
    return {
      authors: authors.map(({ name, slug, avatar, translations }, i) => ({
        ...translations[i],
        avatar,
        name,
        slug,
      })),
      quote: text,
      tags: tags.map(({ translations, slug }) => ({
        ...translations[0],
        slug,
      })),
      ...rest,
      ...restTranslations,
      sourceName: sourceName.translations[0].name,
      sourceType: sourceType.translations[0].name,
    };
  });
