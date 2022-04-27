import { ConsumeMessage } from 'amqplib';
import { Channel } from 'amqplib';
import { GenerateInvoice } from '../../services/generate-invoice';
import { Logger, SaleEventBuilder } from '../../../../libs/store-core';
import { Rabbit, RabbitListener } from '../rabbit/rabbit';

export class SaleConsumer implements RabbitListener {
    private _channel?: Channel;
    private _rabbit?: Rabbit;

    constructor(
        private readonly generateInvoice: GenerateInvoice,
        rabbit: Rabbit
    ) {
        rabbit.register(this);
    }
    private async getChannel(): Promise<Channel> {
        if (!this._channel) {
            this._channel = await this._rabbit?.createChannel();
        }
        return this._channel!;
    }

    async onConnect(rabbit: Rabbit): Promise<void> {
        Logger.info('[SaleConsumer] onConnect');
        this._rabbit = rabbit;
        const channel = await this.getChannel();
        channel.consume('invoice.sale', (msg) => this.onMessage(msg), {
            noAck: false
        });
    }

    async onMessage(msg: ConsumeMessage | null): Promise<void> {
        if (!msg) return;
        const channel = await this.getChannel();
        try {
            const data = JSON.parse(msg.content.toString());
            const saleEvent = SaleEventBuilder.of(data).build();
            this.generateInvoice.perform({
                orderCode: saleEvent.orderCode,
                quantity: saleEvent.quantity,
                product: saleEvent.product
            });
            Logger.info(
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
