-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "cd_product" TEXT NOT NULL,
    "in_blocked" BOOLEAN NOT NULL DEFAULT false,
    "qt_stock" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_cd_product_key" ON "products"("cd_product");