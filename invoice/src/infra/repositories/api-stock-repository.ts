import { StockItem } from '../../models';
import { FindStockProduct } from '../../repositories';
import { DomainError } from '../../errors';

import axios from 'axios';
import { Logger } from '../../../../libs/store-core';

export class ApiStockRepository implements FindStockProduct {
    constructor(private readonly url: string) {}

    async findProduct({
        code
    }: {
        code: string;
    }): Promise<StockItem | undefined> {
        try {
            const uri = `${this.url}/api/products/${code}`;
            Logger.info(`[ApiStockRepository] geting stock uri ${uri}`);
            const response = await axios.get(uri, {
                validateStatus: (status) => {
                    return status < 500;
                }
            });
            Logger.info(
                `[ApiStockRepository] getting stock Response ${
                    response.status
                } ${JSON.stringify(response.data)}`
            );
            if (response.status === 200) {
                return new StockItem(response.data);
            }
            if (response.status >= 400 && response.status < 500) {
                if (response.status === 404) return undefined;
                throw new DomainError(response.data.error);
            }
        } catch (error: any) {
            Logger.error(`[ApiStockRepository]  ${error.message}`);
            throw new Error(error);
        }
    }
}
