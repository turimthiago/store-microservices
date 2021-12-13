import { RabbitmqServer } from '../rabbit/rabbitmq-server';
import { Order, SaleEvent } from '../../../../libs/store-core';

export class SaleProducer {
    constructor(private readonly connection: RabbitmqServer) {}

    async publish(order: Order): Promise<void> {
        if (!order.id) throw new Error('Order id is undefined.');
        const saleEvent = new SaleEvent({
            orderCode: order.id,
            product: order.item.product,
            quantity: order.item.quantity
        });
        const json = JSON.stringify(saleEvent);
        console.log(
            `[SaleProducer] publishing message ${JSON.stringify(saleEvent)}`
        );
        await this.connection.publish('sale', json);
    }
}
