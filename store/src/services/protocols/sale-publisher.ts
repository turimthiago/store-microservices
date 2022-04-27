import { SaleEvent } from '../../../../libs/store-core';

export interface SalePublisher {
    publish(saleEvent: SaleEvent): Promise<void>;
}
