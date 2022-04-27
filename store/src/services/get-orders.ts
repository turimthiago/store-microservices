import { Logger } from '../../../libs/store-core';
import { Order } from '../models';
import { GetOrdersRepository } from '../repositories';

export class GetOrders {
    constructor(private readonly orderRepository: GetOrdersRepository) {}

    async perform(): Promise<GetOrders.Result> {
        const orders = await this.orderRepository.getOrders();
        Logger.info(`[GetOrders] size ${orders.length}`);
        return orders;
    }
}

export namespace GetOrders {
    export type Result = Order[];
}
