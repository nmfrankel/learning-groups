/*
  Warnings:

  - You are about to drop the column `isRoshChaburah` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "phone" TEXT NOT NULL,
    "pictureURL" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isDonor" BOOLEAN NOT NULL DEFAULT false,
    "chaburahID" INTEGER,
    CONSTRAINT "User_chaburahID_fkey" FOREIGN KEY ("chaburahID") REFERENCES "Chaburah" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("chaburahID", "id", "isDonor", "name", "password", "phone", "pictureURL") SELECT "chaburahID", "id", "isDonor", "name", "password", "phone", "pictureURL" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
