-- CreateTable
CREATE TABLE "quotes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "quote_translations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "reference" TEXT,
    "language" TEXT NOT NULL,
    "quoteId" INTEGER NOT NULL,
    "sourceNameId" INTEGER NOT NULL,
    "sourceTypeId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "quote_translations_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "quotes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "quote_translations_sourceNameId_fkey" FOREIGN KEY ("sourceNameId") REFERENCES "source_names" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "quote_translations_sourceTypeId_fkey" FOREIGN KEY ("sourceTypeId") REFERENCES "source_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "authors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "author_translations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "author_translations_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "authors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "source_names" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "source_name_translations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "sourceNameId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "source_name_translations_sourceNameId_fkey" FOREIGN KEY ("sourceNameId") REFERENCES "source_names" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "source_types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "source_type_translations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "sourceTypeId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "source_type_translations_sourceTypeId_fkey" FOREIGN KEY ("sourceTypeId") REFERENCES "source_types" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "tag_translations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "tagId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "tag_translations_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "supported_languages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "uuid" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "query_cache" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "_QuoteTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_QuoteTags_A_fkey" FOREIGN KEY ("A") REFERENCES "quotes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_QuoteTags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_QuoteAuthors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_QuoteAuthors_A_fkey" FOREIGN KEY ("A") REFERENCES "authors" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_QuoteAuthors_B_fkey" FOREIGN KEY ("B") REFERENCES "quotes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "quotes_uuid_key" ON "quotes"("uuid");

-- CreateIndex
CREATE INDEX "quotes_addedAt_idx" ON "quotes"("addedAt");

-- CreateIndex
CREATE INDEX "quotes_uuid_idx" ON "quotes"("uuid");

-- CreateIndex
CREATE INDEX "quotes_isDeleted_idx" ON "quotes"("isDeleted");

-- CreateIndex
CREATE UNIQUE INDEX "quote_translations_uuid_key" ON "quote_translations"("uuid");

-- CreateIndex
CREATE INDEX "quote_translations_language_idx" ON "quote_translations"("language");

-- CreateIndex
CREATE INDEX "quote_translations_sourceNameId_idx" ON "quote_translations"("sourceNameId");

-- CreateIndex
CREATE INDEX "quote_translations_sourceTypeId_idx" ON "quote_translations"("sourceTypeId");

-- CreateIndex
CREATE INDEX "quote_translations_createdAt_idx" ON "quote_translations"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "quote_translations_quoteId_language_key" ON "quote_translations"("quoteId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "authors_uuid_key" ON "authors"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "authors_slug_key" ON "authors"("slug");

-- CreateIndex
CREATE INDEX "authors_slug_idx" ON "authors"("slug");

-- CreateIndex
CREATE INDEX "authors_isDeleted_idx" ON "authors"("isDeleted");

-- CreateIndex
CREATE UNIQUE INDEX "author_translations_uuid_key" ON "author_translations"("uuid");

-- CreateIndex
CREATE INDEX "author_translations_language_idx" ON "author_translations"("language");

-- CreateIndex
CREATE UNIQUE INDEX "author_translations_authorId_language_key" ON "author_translations"("authorId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "source_names_uuid_key" ON "source_names"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "source_name_translations_uuid_key" ON "source_name_translations"("uuid");

-- CreateIndex
CREATE INDEX "source_name_translations_language_idx" ON "source_name_translations"("language");

-- CreateIndex
CREATE UNIQUE INDEX "source_name_translations_sourceNameId_language_key" ON "source_name_translations"("sourceNameId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "source_types_uuid_key" ON "source_types"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "source_type_translations_uuid_key" ON "source_type_translations"("uuid");

-- CreateIndex
CREATE INDEX "source_type_translations_language_idx" ON "source_type_translations"("language");

-- CreateIndex
CREATE UNIQUE INDEX "source_type_translations_sourceTypeId_language_key" ON "source_type_translations"("sourceTypeId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "tags_uuid_key" ON "tags"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "tags_slug_idx" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "tags_isDeleted_idx" ON "tags"("isDeleted");

-- CreateIndex
CREATE UNIQUE INDEX "tag_translations_uuid_key" ON "tag_translations"("uuid");

-- CreateIndex
CREATE INDEX "tag_translations_language_idx" ON "tag_translations"("language");

-- CreateIndex
CREATE UNIQUE INDEX "tag_translations_tagId_language_key" ON "tag_translations"("tagId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "supported_languages_uuid_key" ON "supported_languages"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "supported_languages_code_key" ON "supported_languages"("code");

-- CreateIndex
CREATE UNIQUE INDEX "query_cache_key_key" ON "query_cache"("key");

-- CreateIndex
CREATE INDEX "query_cache_expiresAt_idx" ON "query_cache"("expiresAt");

-- CreateIndex
CREATE INDEX "query_cache_key_idx" ON "query_cache"("key");

-- CreateIndex
CREATE UNIQUE INDEX "_QuoteTags_AB_unique" ON "_QuoteTags"("A", "B");

-- CreateIndex
CREATE INDEX "_QuoteTags_B_index" ON "_QuoteTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuoteAuthors_AB_unique" ON "_QuoteAuthors"("A", "B");

-- CreateIndex
CREATE INDEX "_QuoteAuthors_B_index" ON "_QuoteAuthors"("B");
