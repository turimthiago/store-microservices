import { CreateOrderRepository } from '../../repositories';

import { v4 } from 'uuid';
import { Order } from '../../../../libs/store-core';

export class MemoryOrderRepository implements CreateOrderRepository {
    constructor() {}

    async createOrder(order: Order): Promise<string> {
        console.log(`[MemoryOrderRepository] order=${JSON.stringify(order)}`);
        return v4();
    }
}
