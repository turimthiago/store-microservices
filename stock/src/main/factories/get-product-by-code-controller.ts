import { PrismaClient } from '@prisma/client';
import { GetProductByCodeController } from '../../controllers/get-product-by-id';
import { PrismaProductRepository } from '../../infra/postgres/repositories';
import { GetProductByCode } from '../../services';

export const makeGetControllerByCode = (): GetProductByCodeController => {
    const productRepository = new PrismaProductRepository();
    const getProductByCode = new GetProductByCode(productRepository);
    return new GetProductByCodeController(getProductByCode);
};
