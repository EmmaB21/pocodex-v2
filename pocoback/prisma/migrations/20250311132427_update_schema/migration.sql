-- AlterTable
ALTER TABLE "Card" ADD COLUMN "suffix" TEXT;

-- CreateTable
CREATE TABLE "Ability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "effect" TEXT,
    "cardId" TEXT NOT NULL,
    CONSTRAINT "Ability_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
