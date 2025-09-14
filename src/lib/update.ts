import { Resuponsu } from 'resuponsu';
import { z } from 'zod/v4';

import { client } from '@/lib/client';
import jwtVerify from '@/lib/jwt';

// Define Zod schema for update validation
export const UpdateSchema = z.object({
  id: z.number().min(1, 'Id is required'),
  language: z.string().min(2, 'Language is required'),
  quote: z.string().min(1, 'Quote is required'),
});

export type Update = z.infer<typeof UpdateSchema>;

export const update = async (c: C) => {
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
  let updateData: Update;
  try {
    const updateJson = await c.req.json();

    updateData = UpdateSchema.parse(updateJson);
  } catch (error) {
    return Resuponsu.json({
      message: `Invalid update data: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      status: 400,
      success: false,
    });
  }

  try {
    await prisma.quote.update({
      data: {
        translations: {
          update: {
            data: { text: updateData.quote, updatedAt: new Date() },
            where: { id: updateData.id, language: updateData.language },
          },
        },
        updatedAt: new Date(),
      },
      where: { id: updateData.id },
    });
    return Resuponsu.json({
      message: 'Quote updated successfully',
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
