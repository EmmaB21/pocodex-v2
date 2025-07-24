-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "localId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "category" TEXT NOT NULL,
    "rarity" TEXT,
    "hp" INTEGER,
    "evolveFrom" TEXT,
    "evolveTo" TEXT NOT NULL DEFAULT '[]',
    "stage" TEXT,
    "description" TEXT,
    "retreat" INTEGER,
    "variants" TEXT NOT NULL DEFAULT '[]',
    "setId" TEXT NOT NULL,
    "trainerType" TEXT,
    "effect" TEXT,
    "energyType" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Card_setId_fkey" FOREIGN KEY ("setId") REFERENCES "SetBrief" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("category", "createdAt", "description", "effect", "energyType", "evolveFrom", "evolveTo", "hp", "id", "image", "localId", "name", "rarity", "retreat", "setId", "stage", "trainerType", "variants") SELECT "category", "createdAt", "description", "effect", "energyType", "evolveFrom", "evolveTo", "hp", "id", "image", "localId", "name", "rarity", "retreat", "setId", "stage", "trainerType", "variants" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
