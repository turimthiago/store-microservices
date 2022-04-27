import { CreateOrderRepository } from '../../repositories';

import { v4 } from 'uuid';
import { Logger, Order } from '../../../../libs/store-core/dist';

export class MemoryOrderRepository implements CreateOrderRepository {
    constructor() {}

    async createOrder(order: Order): Promise<string> {
        Logger.info(
            `[MemoryOrderRepository] creating order=${JSON.stringify(order)}`
        );
        return v4();
    }
}
