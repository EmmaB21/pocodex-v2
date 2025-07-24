-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cost" TEXT NOT NULL DEFAULT '[]',
    "effect" TEXT,
    "damage" INTEGER,
    "cardId" TEXT NOT NULL,
    CONSTRAINT "Attack_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Attack" ("cardId", "cost", "damage", "effect", "id", "name") SELECT "cardId", "cost", "damage", "effect", "id", "name" FROM "Attack";
DROP TABLE "Attack";
ALTER TABLE "new_Attack" RENAME TO "Attack";
CREATE TABLE "new_CardType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    CONSTRAINT "CardType_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CardType" ("cardId", "id", "type") SELECT "cardId", "id", "type" FROM "CardType";
DROP TABLE "CardType";
ALTER TABLE "new_CardType" RENAME TO "CardType";
CREATE TABLE "new_Resistance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    CONSTRAINT "Resistance_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Resistance" ("cardId", "id", "type", "value") SELECT "cardId", "id", "type", "value" FROM "Resistance";
DROP TABLE "Resistance";
ALTER TABLE "new_Resistance" RENAME TO "Resistance";
CREATE TABLE "new_Weakness" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    CONSTRAINT "Weakness_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Weakness" ("cardId", "id", "type", "value") SELECT "cardId", "id", "type", "value" FROM "Weakness";
DROP TABLE "Weakness";
ALTER TABLE "new_Weakness" RENAME TO "Weakness";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
