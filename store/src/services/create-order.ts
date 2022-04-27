import { SaleEvent } from '../../../libs/store-core';
import { Order, OrderItem } from '../models';
import { CreateOrderRepository } from '../repositories';
import { SalePublisher } from './protocols/sale-publisher';

export class CreateOrder {
    constructor(
        private readonly createOrderRepository: CreateOrderRepository,
        private readonly salePublisher: SalePublisher
    ) {}

    async perform({ product, quantity }: CreateOrder.Params): Promise<void> {
        const item = new OrderItem({ product, quantity });
        const order = new Order({
            item
        });
        const id = await this.createOrderRepository.createOrder(order);
        const event = new SaleEvent({
            orderCode: id,
            product,
            quantity
        });
        this.salePublisher.publish(event);
    }
}

export namespace CreateOrder {
    export type Params = {
        product: string;
        quantity: number;
    };
}
