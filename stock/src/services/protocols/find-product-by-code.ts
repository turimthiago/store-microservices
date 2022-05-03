import { Product } from '../../models/products';

export interface FindProductByCode {
    findByCode(code: string): Promise<Product | undefined>;
}
