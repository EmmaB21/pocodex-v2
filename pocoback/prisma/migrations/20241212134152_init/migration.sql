-- CreateTable
CREATE TABLE "Card" (
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
    "setId" TEXT NOT NULL,
    "trainerType" TEXT,
    "effect" TEXT,
    "energyType" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Card_setId_fkey" FOREIGN KEY ("setId") REFERENCES "SetBrief" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CardType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    CONSTRAINT "CardType_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cost" TEXT NOT NULL DEFAULT '[]',
    "effect" TEXT,
    "damage" INTEGER,
    "cardId" TEXT NOT NULL,
    CONSTRAINT "Attack_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SetBrief" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "symbol" TEXT,
    "cardTotal" INTEGER
);
