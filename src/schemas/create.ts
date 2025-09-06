import { z } from 'zod/v4';

// Define Zod schema for quote validation
export const QuoteSchema = z.object({
  addedAt: z.string().optional(),
  authors: z
    .array(
      z.object({
        avatar: z.string(),
        bio: z.object({
          en: z.string(),
          es: z.string(),
        }),
        name: z.string().min(1, 'Author name is required'),
      }),
    )
    .min(1, 'At least one author is required'),
  quote: z.object({
    en: z.string().min(1, 'English quote is required'),
    es: z.string().min(1, 'Spanish quote is required'),
  }),
  reference: z.object({
    en: z.string(),
    es: z.string(),
  }),
  sourceName: z.object({
    en: z.string().min(1, 'English source name is required'),
    es: z.string().min(1, 'Spanish source name is required'),
  }),
  sourceType: z.object({
    en: z.string().min(1, 'English source type is required'),
    es: z.string().min(1, 'Spanish source type is required'),
  }),
  sourceUrl: z.string(),
  // z.url('Valid URL is required'),
  tags: z
    .array(
      z.object({
        name: z.object({
          en: z.string().min(1, 'English tag name is required'),
          es: z.string().min(1, 'Spanish tag name is required'),
        }),
      }),
    )
    .min(1, 'At least one tag is required'),
});

export type Quote = z.infer<typeof QuoteSchema>;
