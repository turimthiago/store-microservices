import { CreateOrderRepository } from '../../repositories';

import { v4 } from 'uuid';
import { Order } from '../../../../libs/store-core/dist';

export class MemoryOrderRepository implements CreateOrderRepository {
    constructor() {}

    async createOrder(order: Order): Promise<string> {
        console.log(`[MemoryOrderRepository] order=${JSON.stringify(order)}`);
        return v4();
    }
}
