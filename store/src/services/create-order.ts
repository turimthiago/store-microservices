import { Logger, SaleEvent } from '../../../libs/store-core';
import { Order, OrderItem } from '../models';
import { CreateOrderRepository } from '../repositories';
import { SalePublisher } from './protocols/sale-publisher';

export class CreateOrder {
    constructor(
        private readonly createOrderRepository: CreateOrderRepository,
        private readonly salePublisher: SalePublisher
    ) {}

    async perform({ items }: CreateOrder.Params): Promise<void> {
        Logger.info(`[CreateOrder] creating order ${JSON.stringify(items)}`);
        const order = new Order({ items });
        const { id } = await this.createOrderRepository.createOrder(order);
        Logger.info(`[CreateOrder] created order ${id}`);
        const event = new SaleEvent({
            orderCode: id!,
            items: order.items
        });
        Logger.info(`[CreateOrder] publish event ${JSON.stringify(event)}`);
        await this.salePublisher.publish(event);
    }
}

export namespace CreateOrder {
    export type Params = {
        items: OrderItem[];
    };
}
