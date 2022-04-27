import { CreateOrderRepository, GetOrdersRepository } from '../../repositories';
import { Logger } from '../../../../libs/store-core';
import { Order } from '../../models';

import { v4 } from 'uuid';
export class MemoryOrderRepository
    implements CreateOrderRepository, GetOrdersRepository
{
    private readonly orders: Order[] = [];

    constructor() {}

    async getOrders(): Promise<Order[]> {
        return this.orders;
    }

    async createOrder(order: Order): Promise<Order> {
        Logger.info(
            `[MemoryOrderRepository] creating order=${JSON.stringify(order)}`
        );
        order.id = v4();
        this.orders.push(order);
        return order;
    }
}
