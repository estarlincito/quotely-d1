import { toSlug } from '@estarlincito/utils';
import { Resuponsu } from 'resuponsu';

import { client } from '@/lib/client';
import jwtVerify from '@/lib/jwt';
import { type Quote, QuoteSchema } from '@/schemas/create';

export const create = async (c: C) => {
  const prisma = client(c.env.DB);

  // Validate JWT authentication
  const authHeader = c.req.headers.get('Authorization');

  if (!authHeader) {
    return Resuponsu.json({
      message: 'Authorization header is required',
      status: 401,
      success: false,
    });
  }

  const auth = await jwtVerify(authHeader, c.env.SECRET);
  if (auth instanceof Response) return auth;

  // Parse and validate request data
  let quoteData: Quote;
  try {
    const quoteJson = await c.req.json();

    quoteData = QuoteSchema.parse(quoteJson);
  } catch (error) {
    return Resuponsu.json({
      message: `Invalid quote data: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      status: 400,
      success: false,
    });
  }

  try {
    // Check if quote already exists (case-insensitive)
    const duplicateQuote = await prisma.quoteTranslation.findFirst({
      where: {
        OR: [
          { text: { equals: quoteData.quote.en } },
          { text: { equals: quoteData.quote.es } },
        ],
      },
    });

    if (duplicateQuote) {
      return Resuponsu.json({
        message: 'A quote with this text already exists',
        status: 409,
        success: false,
      });
    }

    // Separate helper functions for each model type to avoid type issues
    const findOrCreateSourceType = async (nameData: {
      en: string;
      es: string;
    }) => {
      // Try to find existing source type by English name
      const existingSourceType = await prisma.sourceType.findFirst({
        where: {
          translations: {
            some: {
              language: 'en',
              name: nameData.en,
            },
          },
        },
      });

      if (existingSourceType) return existingSourceType.id;

      // Create new source type with translations
      const newSourceType = await prisma.sourceType.create({
        data: {
          translations: {
            create: [
              { language: 'en', name: nameData.en },
              { language: 'es', name: nameData.es },
            ],
          },
        },
      });

      return newSourceType.id;
    };

    const findOrCreateSourceName = async (nameData: {
      en: string;
      es: string;
    }) => {
      // Try to find existing source name by English name
      const existingSourceName = await prisma.sourceName.findFirst({
        where: {
          translations: {
            some: {
              language: 'en',
              name: nameData.en,
            },
          },
        },
      });

      if (existingSourceName) return existingSourceName.id;

      // Create new source name with translations
      const newSourceName = await prisma.sourceName.create({
        data: {
          translations: {
            create: [
              { language: 'en', name: nameData.en },
              { language: 'es', name: nameData.es },
            ],
          },
        },
      });

      return newSourceName.id;
    };

    const findOrCreateTag = async (nameData: { en: string; es: string }) => {
      const slug = toSlug(nameData.en);

      // Try to find existing tag by slug
      const existingTag = await prisma.tag.findFirst({
        where: { slug },
      });

      if (existingTag) return existingTag.id;

      // Create new tag with translations
      const newTag = await prisma.tag.create({
        data: {
          slug,
          translations: {
            create: [
              { language: 'en', name: nameData.en },
              { language: 'es', name: nameData.es },
            ],
          },
        },
      });

      return newTag.id;
    };

    // Create or get source type ID
    const sourceTypeId = await findOrCreateSourceType(quoteData.sourceType);

    // Create or get source name ID
    const sourceNameId = await findOrCreateSourceName(quoteData.sourceName);

    // Process authors
    const authorIds = [];
    for (const author of quoteData.authors) {
      const slug = toSlug(author.name);

      // Try to find existing author by slug
      let existingAuthor = await prisma.author.findFirst({
        where: { slug },
      });

      if (!existingAuthor) {
        // Create new author
        existingAuthor = await prisma.author.create({
          data: {
            avatar: author.avatar,
            name: author.name,
            slug,
            translations: {
              create: [
                { bio: author.bio.en, language: 'en' },
                { bio: author.bio.es, language: 'es' },
              ],
            },
          },
        });
      }

      authorIds.push(existingAuthor.id);
    }

    // Process tags
    const tagIds = [];
    for (const tag of quoteData.tags) {
      const tagId = await findOrCreateTag(tag.name);
      tagIds.push(tagId);
    }

    // Create the quote with all its relations (including sourceUrl)
    await prisma.quote.create({
      data: {
        // Connect authors and tags
        addedAt: quoteData.addedAt ? new Date(quoteData.addedAt) : new Date(),
        authors: {
          connect: authorIds.map((id) => ({ id })),
        },

        sourceUrl: quoteData.sourceUrl,

        tags: {
          connect: tagIds.map((id) => ({ id })),
        },

        // Create quote translations
        translations: {
          create: [
            {
              language: 'en',
              reference: quoteData.reference?.en,
              sourceNameId,
              sourceTypeId,
              text: quoteData.quote.en,
            },
            {
              language: 'es',
              reference: quoteData.reference?.es,
              sourceNameId,
              sourceTypeId,
              text: quoteData.quote.es,
            },
          ],
        },
      },
    });

    return Resuponsu.json({
      message: 'Quote created successfully',
      status: 200,
      success: true,
    });
  } catch {
    return Resuponsu.json({
      message: 'Internal server error during quote creation',
      status: 500,
      success: false,
    });
  }
};
