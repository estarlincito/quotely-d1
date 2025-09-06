# Wrangler Commands

## `pnpm run cf-typegen`

Generates **TypeScript types** for your Cloudflare Workers and KV bindings.  
You should run this command **whenever you add or change bindings, secrets, or environment variables** so your TypeScript code stays in sync.

### Usage

```bash
pnpm run cf-typegen
```

## `npx wrangler secret put [NAME]`

Adds a **secret environment variable** to your Cloudflare Worker.  
Secrets are encrypted and accessible only in your Worker’s environment, not exposed to the client.

### Usage

```bash
npx wrangler secret put MY_SECRET
```

## `wrangler d1 list`

Lists all **Cloudflare D1 databases** in your account.

**Usage:**

```bash
wrangler d1 list
```

## `wrangler d1 migrations list`

Shows all **migrations** applied or pending for a specific D1 database.

**Usage:**

```bash
wrangler d1 migrations list --database MY_DATABASE
```

## `wrangler d1 migrations create [DB] [NAME]`

Creates a **new migration file** for a Cloudflare D1 database.  
Migrations let you define schema changes (tables, columns, indexes) in version-controlled files.

**Usage:**

```bash
wrangler d1 migrations create DB quote_table
```

## `wrangler d1 migrations apply [DB] --local`

Applies pending **migrations locally** to your D1 database.  
Useful for testing changes before deploying to production.

**Usage:**

```bash
wrangler d1 migrations apply DB --local
```

## `wrangler d1 migrations apply [DB] --remote`

Applies pending migrations to the live Cloudflare D1 database.
Use this when you are ready to update your production database.

**Usage:**

```bash
wrangler d1 migrations apply DB --remote
```
