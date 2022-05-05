import { StockItem } from '../models';

export interface FindStockProduct {
    findProduct({ code }: { code: string }): Promise<StockItem | undefined>;
}
