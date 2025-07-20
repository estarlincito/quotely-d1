```bash
wrangler d1 execute DB --remote --command "SELECT * FROM d1_migrations;"
wrangler d1 execute DB --remote --command "DELETE FROM d1_migrations WHERE id = 2;"
wrangler d1 execute DB --remote --command "SELECT name FROM sqlite_master WHERE type='table' AND name='Quote';"
wrangler d1 execute DB --remote --command "SELECT * FROM Quote;"
wrangler d1 execute DB --remote --command "SELECT name FROM sqlite_master WHERE type='table';"
wrangler d1 execute DB --remote --command "SELECT * FROM Quote LIMIT 10;"
wrangler d1 execute DB --remote --command "ALTER TABLE Author ADD COLUMN slug TEXT;"
wrangler d1 execute DB --remote --command "UPDATE Author SET slug = LOWER(REPLACE(name, ' ', '-'))WHERE slug IS NULL OR slug = '';"
wrangler d1 execute DB --remote --command "SELECT sql FROM sqlite_schema WHERE type='table';"
```

```bash
wrangler d1 execute DB --remote --command "
SELECT slug, COUNT(_)
FROM Author
GROUP BY slug
HAVING COUNT(_) > 1;"
```

```bash
wrangler d1 execute DB --remote --command ""

```

###

```bash
# Export remote DB
wrangler d1 export DB --remote --output ./remote-backup.sql
# Delete existing local DB (if needed)
wrangler d1 delete DB

# Create fresh local DB
wrangler d1 create DB

# Import the backup
wrangler d1 execute DB --remote --file ./remote-backup.sql

# Verify data
wrangler d1 execute DB --remote --command "SELECT * FROM Author LIMIT 5;"

wrangler d1 migrations apply DB --remote
```

```bash
wrangler d1 delete quotely
wrangler d1 create quotely
wrangler d1 execute DB --remote --file ./remote-backup.sql
```
