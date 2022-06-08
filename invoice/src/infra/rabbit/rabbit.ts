import { connect, Connection, Channel } from 'amqplib';
import { Logger } from '../../../../libs/store-core';
import { invoiceSale, sale } from './constants';

export class Rabbit {
    private _listeners: RabbitListener[] = [];
    private _connection?: Connection;
    private _uri: string;

    constructor(uri: string) {
        this._uri = uri;
    }

    register(listener: RabbitListener) {
        this._listeners.push(listener);
    }

    async createChannel(): Promise<Channel | undefined> {
        return this._connection?.createChannel();
    }

    async connect() {
        try {
            Logger.info(`[Rabbit] trying connection Rabbit ${this._uri}`);
            this._connection = await connect(this._uri);
            Logger.info(`Rabbit] connected Rabbit ${this._uri}`);
            const channel = await this._connection.createChannel();
            await Promise.all([
                channel.assertExchange(invoiceSale.name, 'topic', {
                    durable: true
                }),
                channel.assertQueue(invoiceSale.work.name, {
                    durable: true
                })
            ]);
            await Promise.all([
                channel.bindQueue(invoiceSale.work.name, sale.name, 'sale'),
                channel.bindQueue(invoiceSale.work.name, invoiceSale.name, ''),
                channel.assertQueue(invoiceSale.retry.name, {
                    durable: true,
                    deadLetterExchange: invoiceSale.name,
                    deadLetterRoutingKey: invoiceSale.dlq.routingKey,
                    messageTtl: 5 * 60 * 1000
                }),
                channel.bindQueue(
                    invoiceSale.retry.name,
                    invoiceSale.name,
                    invoiceSale.retry.routingKey
                ),
                channel.assertQueue(invoiceSale.fail.name, {
                    durable: true
                }),
                channel.bindQueue(
                    invoiceSale.fail.name,
                    invoiceSale.name,
                    invoiceSale.fail.routingKey
                ),
                channel.assertQueue(invoiceSale.dlq.name, {
                    durable: true
                }),
                channel.bindQueue(
                    invoiceSale.dlq.name,
                    invoiceSale.name,
                    invoiceSale.dlq.routingKey
                )
            ]);
            channel.close();
            this._connection.on('close', () => this.connect());
            this._listeners.forEach(async (listener) =>
                listener.onConnect(this)
            );
        } catch (error) {
            Logger.error(`[Rabbit] error connection Rabbit ${this._uri}`);
            setTimeout(() => this.connect(), 5000);
        }
    }
}

export interface RabbitListener {
    onConnect(rabbit: Rabbit): void;
}
