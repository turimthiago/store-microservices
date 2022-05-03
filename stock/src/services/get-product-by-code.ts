import { Logger } from '../../../libs/store-core/src';
import { ProductNotFoundError } from '../errors';
import { Product } from '../models/products';
import { FindProductByCode } from './protocols';

export class GetProductByCode {
    constructor(private readonly productRepository: FindProductByCode) {}

    async perform({ code }: GetStockByProducts.Params): Promise<Product> {
        const product = await this.productRepository.findByCode(code);
        Logger.info(`[GetProductByCode] product ${JSON.stringify(product)}`);
        if (!product)
            throw new ProductNotFoundError(`Product ${code} is not found`);
        return product;
    }
}

export namespace GetStockByProducts {
    export type Params = { code: string };
}
