import { ConsumeMessage } from 'amqplib';
import { Channel } from 'amqplib';
import { GenerateInvoice } from '../../services/generate-invoice';
import { Logger, SaleEventBuilder } from '../../../../libs/store-core';
import { Rabbit, RabbitListener } from '../rabbit/rabbit';
import { DomainError } from '../../errors';
import { invoiceSale } from '../rabbit';

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
        channel.consume('invoice.sale.work', (msg) => this.onMessage(msg), {
            noAck: false
        });
    }

    async onMessage(msg: ConsumeMessage | null): Promise<void> {
        Logger.info(`[SaleConsumer] onMessage `);
        if (!msg) return;
        const channel = await this.getChannel();
        const data = JSON.parse(msg.content.toString());
        const saleEvent = SaleEventBuilder.of(data).build();
        try {
            await this.generateInvoice.perform({
                orderCode: saleEvent.orderCode,
                items: saleEvent.items
            });
            Logger.info(
                `[SaleConsumer] consuming message ${JSON.stringify(saleEvent)}`
            );
            channel.ack(msg);
        } catch (e: any) {
            if (e instanceof DomainError) {
                channel.ack(msg);
                channel.publish(
                    invoiceSale.name,
                    invoiceSale.fail.routingKey,
                    Buffer.from(
                        JSON.stringify({
                            event: saleEvent,
                            error: `${e.message} ${e.name}`
                        })
                    )
                );
                Logger.info(
                    `[SaleConsumer] publishing event to fail ${JSON.stringify(
                        saleEvent
                    )} error ${e.message} ${e.name}`
                );
            } else {
                channel.ack(msg);
                const count = msg.properties.headers['x-retry-count'] || 0;
                channel.publish('invoice.sale', 'retry', msg.content, {
                    headers: {
                        'x-retry-count': count + 1
                    }
                });
                Logger.info(
                    `[SaleConsumer] publishing event to retry ${JSON.stringify(
                        saleEvent
                    )} count try ${count}`
                );
            }
        }
    }
}
