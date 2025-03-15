import { z } from 'zod';

export const quote = z.object({
  addedAt: z.string().optional(),
  authors: z.array(
    z.object({
      bio: z.string().optional(),
      name: z.string(),
    }),
  ),
  quote: z.string(),
  reference: z.string(),
  sourceName: z.string(),
  sourceType: z.string(),
  sourceUrl: z.string(),
  tags: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

export type Quote = z.infer<typeof quote>;

export const create = { quote };
