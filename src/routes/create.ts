import { ApiResponse, toSlug } from '@estarlincito/utils';
import { Hono } from 'hono';
import { z } from 'zod';

import { client } from '@/lib/client';
import jwtVerify from '@/lib/jwt';
import { createSchema } from '@/schemas/create';

export const createRoute = new Hono<{ Bindings: Bindings }>();

createRoute.post('create', async (c) => {
  const prisma = client(c.env.DB);

  const formData = await c.req.formData();
  // Getting session
  let session: string;
  try {
    session = z.string().parse(formData.get('session'));
  } catch {
    return ApiResponse.json({
      message: 'Session not provided or invalid type.',
      status: 400,
      success: false,
    });
  }
  // Checking session
  const auth = await jwtVerify(session, c.env.SECRET);

  if (auth instanceof Response) {
    return auth;
  }

  // Getting data
  let data: z.infer<typeof createSchema>;
  try {
    const rawData = z.string().parse(formData.get('quote'));
    const decodeData = decodeURIComponent(rawData);
    data = createSchema.parse(JSON.parse(decodeData));
  } catch {
    return ApiResponse.json({
      message: 'Quote not provided or invalid type.',
      status: 400,
      success: false,
    });
  }

  //Adding quote
  try {
    // First ensure all relations exist
    const [sourceType, sourceName] = await Promise.all([
      prisma.sourceType.upsert({
        create: { name: data.sourceType },
        update: {},
        where: { name: data.sourceType },
      }),
      prisma.sourceName.upsert({
        create: { name: data.sourceName },
        update: {},
        where: { name: data.sourceName },
      }),
    ]);

    // Process authors and tags in parallel
    const [authors, tags] = await Promise.all([
      Promise.all(
        data.authors.map(({ name, bio }) =>
          prisma.author.upsert({
            create: { bio, name, slug: toSlug(name) },
            update: {},
            where: { name },
          }),
        ),
      ),
      Promise.all(
        data.tags.map(({ name }) =>
          prisma.tag.upsert({
            create: { name },
            update: {},
            where: { name },
          }),
        ),
      ),
    ]);

    // Create the quote with connections
    await prisma.quote.create({
      data: {
        addedAt: data.addedAt,
        authors: { connect: authors.map((a) => ({ id: a.id })) },
        quote: data.quote,
        reference: data.reference,
        sourceName: { connect: { id: sourceName.id } },
        sourceType: { connect: { id: sourceType.id } },
        sourceUrl: data.sourceUrl,
        tags: { connect: tags.map((t) => ({ id: t.id })) },
      },
      include: {
        // Explicitly include relations in response
        authors: true,
        sourceName: true,
        sourceType: true,
        tags: true,
      },
    });

    return ApiResponse.json({
      message: 'Quote added successfully',
      status: 200,
      success: true,
    });
  } catch {
    return ApiResponse.json({
      message: 'Quote creation failed. Please try again.',
      status: 500,
      success: false,
    });
  }
});
