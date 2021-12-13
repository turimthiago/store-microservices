import { Channel } from 'amqplib';
import { SaleEvent } from '../../../../libs/store-core';
import { RabbitmqServer } from '../../infra/rabbit/rabbitmq-server';

export class SalePublisher {
    private channel!: Channel;

    constructor(
        private readonly rabbit: RabbitmqServer,
        private readonly exchange: string
    ) {}

    private async getChannel(): Promise<Channel> {
        if (!this.channel) {
            this.channel = await this.rabbit.createChannel();
        }
        return this.channel;
    }

    async publish(event: SaleEvent): Promise<void> {
        const channel = await this.getChannel();
        channel.publish(this.exchange, '', Buffer.from(JSON.stringify(event)));
    }
}
