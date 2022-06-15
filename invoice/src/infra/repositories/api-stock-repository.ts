import { StockItem } from '../../models';
import { FindStockProduct } from '../../repositories';
import { DomainError } from '../../errors';

import axios, { Axios } from 'axios';
import { Logger } from '../../../../libs/store-core';

export class ApiStockRepository implements FindStockProduct {
    constructor(private readonly url: string, private readonly axios: Axios) {}

    async findProduct({
        code
    }: {
        code: string;
    }): Promise<StockItem | undefined> {
        const uri = `${this.url}/api/products/${code}`;
        Logger.info(`[ApiStockRepository] geting stock uri ${uri}`);
        const response = await this.axios.get(uri);
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
        Logger.error(`[ApiStockRepository]  ${response.status}`);
        throw new Error(response.data);
    }
}
