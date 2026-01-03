-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "modelUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "baseColor" TEXT NOT NULL,
    "useOriginalColor" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "widthCm" REAL,
    "heightCm" REAL,
    "depthCm" REAL,
    "weightKg" REAL,
    "material" TEXT,
    "maxLoadKg" REAL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("baseColor", "categoryId", "createdAt", "depthCm", "description", "heightCm", "id", "isFeatured", "material", "maxLoadKg", "modelUrl", "name", "slug", "thumbnailUrl", "updatedAt", "weightKg", "widthCm") SELECT "baseColor", "categoryId", "createdAt", "depthCm", "description", "heightCm", "id", "isFeatured", "material", "maxLoadKg", "modelUrl", "name", "slug", "thumbnailUrl", "updatedAt", "weightKg", "widthCm" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
