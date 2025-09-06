# Prisma Commands

## `npx prisma generate`

Generates the **Prisma Client** based on your `schema.prisma`.  
You need to run this command **every time you change the schema** so the client reflects the new tables, relations, or fields.

### Usage

```bash
npx prisma generate
```

## `npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_quote_table.sql`

Generates a **SQL migration script** based on differences between an empty database and your Prisma schema.  
This is useful for creating the initial migration manually or for advanced scenarios.

### Usage

```bash
npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_quote_table.sql
```
