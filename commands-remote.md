```bash
npx prisma generate
pnpm run cf-typegen
npx wrangler secret put [NAME]
```

```bash
wrangler login
wrangler d1 list
wrangler d1 migrations list

```

```bash
npx wrangler d1 migrations create DB quote_table
npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_quote_table.sql


npx prisma migrate diff --from-schema-datamodel ./prisma/schema_old.prisma --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0002_add_slug_author.sql


npx wrangler d1 migrations apply DB --remote
npx prisma generate
pnpm run deploy
```
