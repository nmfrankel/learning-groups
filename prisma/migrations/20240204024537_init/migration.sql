-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "phone" TEXT NOT NULL,
    "pictureURL" TEXT,
    "isRoshChaburah" BOOLEAN NOT NULL DEFAULT false,
    "isDonor" BOOLEAN NOT NULL DEFAULT false,
    "chaburahID" INTEGER NOT NULL,
    CONSTRAINT "User_chaburahID_fkey" FOREIGN KEY ("chaburahID") REFERENCES "Chaburah" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Chaburah" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "yeshiva" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "storage_location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerID" INTEGER NOT NULL,
    CONSTRAINT "File_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "value" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires" DATETIME,
    "bochurID" INTEGER,
    "chaburahID" INTEGER,
    CONSTRAINT "Event_bochurID_fkey" FOREIGN KEY ("bochurID") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Event_chaburahID_fkey" FOREIGN KEY ("chaburahID") REFERENCES "Chaburah" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorID" INTEGER NOT NULL,
    "bochurID" INTEGER NOT NULL,
    CONSTRAINT "Note_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Note_bochurID_fkey" FOREIGN KEY ("bochurID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Event_type_idx" ON "Event"("type");
