import { Logger, SaleEvent } from '../../../libs/store-core';
import { Order, OrderItem } from '../models';
import { CreateOrderRepository } from '../repositories';
import { SalePublisher } from './protocols/sale-publisher';

export class CreateOrder {
    constructor(
        private readonly createOrderRepository: CreateOrderRepository,
        private readonly salePublisher: SalePublisher
    ) {}

    async perform(params: CreateOrder.Params): Promise<void> {
        Logger.info(`[CreateOrder] creating order ${JSON.stringify(params)}`);
        const order = new Order();
        order.items = params.items;
        const { id } = await this.createOrderRepository.createOrder(order);
        const event = new SaleEvent({
            orderCode: id!,
            items: order.items
        });
        Logger.info(`[CreateOrder] created order ${JSON.stringify(order)}`);
        this.salePublisher.publish(event);
    }
}

export namespace CreateOrder {
    export type Params = {
        items: OrderItem[];
    };
}
