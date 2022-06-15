import { connect, Connection, ConfirmChannel } from 'amqplib';
import { Logger } from '../../../../libs/store-core';

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

    async createChannel(): Promise<ConfirmChannel | undefined> {
        return this._connection?.createConfirmChannel();
    }

    async connect() {
        try {
            Logger.info(`[Rabbit] trying connection Rabbit ${this._uri}`);
            this._connection = await connect(this._uri);
            Logger.info(`Rabbit] connected Rabbit ${this._uri}`);
            const channel = await this._connection.createChannel();
            await channel.assertExchange('sale.alternative', 'fanout', {
                durable: true
            });
            await channel.assertQueue('sale.not_categorized', {
                durable: true
            });
            await channel.bindQueue(
                'sale.not_categorized',
                'sale.alternative',
                ''
            );
            await channel.assertExchange('sale', 'topic', {
                durable: true,
                alternateExchange: 'sale.alternative'
            });
            channel.close();

            this._connection.on('close', () => {
                this.connect();
                this._listeners.forEach((listener) =>
                    listener.onDisconnect(this)
                );
            });
            this._listeners.forEach((listener) => listener.onConnect(this));
        } catch (error) {
            Logger.error(`[Rabbit] error connection Rabbit ${this._uri}`);
            setTimeout(() => this.connect(), 5000);
        }
    }
}

export interface RabbitListener {
    onConnect(rabbit: Rabbit): void;
    onDisconnect(rabbit: Rabbit): void;
}
