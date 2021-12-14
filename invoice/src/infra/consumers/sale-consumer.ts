import { ConsumeMessage } from 'amqplib';
import { RabbitmqServer } from '../rabbit/rabbitmq-server';
import { GenerateInvoice } from '../../services/generate-invoice';
import { SaleEventBuilder } from '../../../../libs/store-core';

export class SaleConsumer {
    constructor(
        private readonly generateInvoice: GenerateInvoice,
        private readonly connection: RabbitmqServer
    ) {}

    async start() {
        const channel = await this.connection.getChannel();
        channel.consume('sale.work', (msg) => this.onMessage(msg), {
            noAck: false
        });
    }

    async onMessage(msg: ConsumeMessage | null): Promise<void> {
        if (!msg) return;
        const channel = await this.connection.getChannel();
        try {
            const data = JSON.parse(msg.content.toString());
            const saleEvent = SaleEventBuilder.of(data).build();
            this.generateInvoice.perform({
                orderCode: saleEvent.orderCode,
                quantity: saleEvent.quantity,
                product: saleEvent.product
            });
            console.log(
                `[SaleConsumer] consuming message ${JSON.stringify(saleEvent)}`
            );
            channel.ack(msg);
        } catch (e) {
            channel.nack(msg);
            const count = msg.properties.headers['x-retry-count'] || 0;
            channel.publish('retry', 'retry', msg.content, {
                headers: {
                    'x-retry-count': count + 1
                }
            });
        }
    }
}
