```bash
npx prisma generate
pnpm run cf-typegen
npx wrangler secret put [NAME]
```

```bash
npx wrangler d1 migrations create DB quote_table
npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_quote_table.sql
npx wrangler d1 migrations apply DB --remote
npx prisma generate
pnpm run deploy


```

### dev

```bash
npx wrangler d1 migrations create DB quote_table
npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_quote_table.sql
npx wrangler d1 migrations apply DB --local
npx prisma generate
```

npx prisma generate

✨ Types written to worker-configuration.d.ts

Action required Migrate from @cloudflare/workers-types to generated runtime types
`wrangler types` now generates runtime types and supersedes @cloudflare/workers-types.
You should now uninstall @cloudflare/workers-types and remove it from your tsconfig.json.

📖 Read about runtime types
https://developers.cloudflare.com/workers/languages/typescript/#generate-types
📣 Remember to rerun 'wrangler types' after you change your wrangler.toml file.

//✘ [ERROR] You must use a real database in the database_id configuration. You can find your databases using 'wrangler d1 list', or read how to develop locally with D1 here: https://developers.cloudflare.com/d1/configuration/local-development

```ts
console.log(
  Base64.encode(
    JSON.stringify(
      zodQuote.parse({
        quote: 'Knowledge is power.',
        reference: 'A reference',
        sourceUrl: 'http://example.com',
        authors: [{ name: 'Juan', bio: 'hola' }, { name: 'Pedro' }],
        sourceName: 'Book Title',
        sourceType: 'Book',
        tags: [{ name: 'Philosophy' }, { name: 'Education' }],
      }),
    ),
  ),
);
```
