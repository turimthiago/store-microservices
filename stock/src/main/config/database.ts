import { PrismaClient } from '@prisma/client';

export const database = async () => {
    const prisma = new PrismaClient();
    await prisma.products.createMany({
        data: [
            { cd_product: '111', qt_stock: 10, in_blocked: false },
            { cd_product: '222', qt_stock: 20, in_blocked: true },
            { cd_product: '333', qt_stock: 30, in_blocked: false }
        ]
    });
};
