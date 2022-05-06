import { PrismaClient } from '@prisma/client';
import { Product } from '../../../models/products';
import { FindProductByCode } from '../../../services/protocols';

export class PrismaProductRepository implements FindProductByCode {
    constructor() {}

    async findByCode(code: string): Promise<Product | undefined> {
        const entity = await new PrismaClient().products.findUnique({
            where: { cd_product: code }
        });
        return entity
            ? new Product({
                  id: entity.id,
                  quantity: entity.qt_stock,
                  code,
                  blocked: entity.in_blocked
              })
            : undefined;
    }
}
