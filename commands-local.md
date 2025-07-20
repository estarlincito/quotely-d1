```bash
pnpm run cf-typegen
npx wrangler secret put [NAME]
```

```bash
wrangler d1 list
wrangler d1 migrations list

```

```bash
npx wrangler d1 migrations create DB quote_table
npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_quote_table.sql


npx prisma migrate diff --from-schema-datamodel ./prisma/schema_old.prisma --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0002_quote_table.sql

npx wrangler d1 migrations apply DB --local


npx prisma generate

```

## create

```ts
console.log(
  encodeURIComponent(
    JSON.stringify(
      createSchema.parse({
        authors: [{ bio: '', name: 'Juan' }, { name: 'Pedro' }],
        quote: 'Knowledge is power.',
        reference: 'A reference',
        sourceName: 'Book Title',
        sourceType: 'Book',
        sourceUrl: 'http://example.com',
        tags: [{ name: 'Philosophy' }, { name: 'Education' }],
      }),
    ),
  ),
);
```

encodeURIComponent(
JSON.stringify(
createSchema.parse({
authors: [{ bio: 'James Donovan Halliday is the creator of the OASIS and instigator of the Easter egg hunt. His OASIS avatar is a wizard called Anorak. He was born in 1972 and grew up in Middletown, Ohio. His father was an alcoholic and his mother suffered from bipolar disorder, and the two of them often fought.', name: 'James Halliday' }],
quote: 'Reality is the only thing that's real.',
reference: '2:09:11',
sourceName: 'Ready Player One',
sourceType: 'Film',
sourceUrl: 'https://www.imdb.com/title/tt1677720',
tags: [{ name: 'Philosophy' }, { name: 'Emotional' }],
}),
),
),
