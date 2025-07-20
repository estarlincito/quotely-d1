// import { toSlug } from '@estarlincito/utils';
// import { Hono } from 'hono';

// import { client } from '@/lib/client';

// export const updateRoute = new Hono<{ Bindings: Bindings }>();

// updateRoute.get('update', async (c) => {
//   const prisma = client(c.env.DB);

//   const authors = await prisma.author.findMany();

//   for (const author of authors) {
//     const slug = toSlug(author.name);

//     await prisma.author.update({
//       data: { slug },
//       where: { id: author.id },
//     });
//   }

//   return c.json({});
// });
