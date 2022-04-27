import { connect, Connection, Channel } from 'amqplib';
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

    async createChannel(): Promise<Channel | undefined> {
        return this._connection?.createChannel();
    }

    async connect() {
        try {
            Logger.info(`[Rabbit] trying connection Rabbit ${this._uri}`);
            this._connection = await connect(this._uri);
            Logger.info(`Rabbit] connected Rabbit ${this._uri}`);
            const channel = await this._connection.createChannel();
            await channel.assertExchange('store.sale', 'fanout', {
                durable: true
            });
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
