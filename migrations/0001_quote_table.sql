-- CreateTable
CREATE TABLE "Quote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quote" TEXT NOT NULL,
    "sourceNameId" INTEGER NOT NULL,
    "sourceTypeId" INTEGER NOT NULL,
    "reference" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Quote_sourceNameId_fkey" FOREIGN KEY ("sourceNameId") REFERENCES "SourceName" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Quote_sourceTypeId_fkey" FOREIGN KEY ("sourceTypeId") REFERENCES "SourceType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "bio" TEXT
);

-- CreateTable
CREATE TABLE "SourceName" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SourceType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QuoteTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_QuoteTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Quote" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_QuoteTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_QuoteAuthors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_QuoteAuthors_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_QuoteAuthors_B_fkey" FOREIGN KEY ("B") REFERENCES "Quote" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Author_slug_key" ON "Author"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SourceName_name_key" ON "SourceName"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SourceType_name_key" ON "SourceType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_QuoteTags_AB_unique" ON "_QuoteTags"("A", "B");

-- CreateIndex
CREATE INDEX "_QuoteTags_B_index" ON "_QuoteTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuoteAuthors_AB_unique" ON "_QuoteAuthors"("A", "B");

-- CreateIndex
CREATE INDEX "_QuoteAuthors_B_index" ON "_QuoteAuthors"("B");
