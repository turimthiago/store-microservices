import { Channel, ConfirmChannel } from 'amqplib';
import { Logger, SaleEvent } from '../../../../libs/store-core/dist';
import { SalePublisher } from '../../services/protocols/sale-publisher';
import { Rabbit, RabbitListener } from '../rabbit/rabbit';

export class RabbitSalePublisher implements RabbitListener, SalePublisher {
    private _channel?: ConfirmChannel;
    private _rabbit?: Rabbit;

    constructor(rabbit: Rabbit, private readonly exchange: string) {
        rabbit.register(this);
    }

    onDisconnect(rabbit: Rabbit): void {
        Logger.info('[RabbitSalePublisher] onDisconnected from Rabbit');
        this._channel = undefined;
    }

    private async getChannel(): Promise<ConfirmChannel | undefined> {
        if (!this._channel) {
            this._channel = await this._rabbit?.createChannel();
        }
        return this._channel;
    }

    async onConnect(rabbit: Rabbit): Promise<void> {
        Logger.info('[RabbitSalePublisher] onConnect');
        this._rabbit = rabbit;
    }

    async publish(event: SaleEvent): Promise<void> {
        Logger.info(
            `[RabbitSalePublisher] publishing ${JSON.stringify(event)}`
        );
        const channel = await this.getChannel();
        if (!channel) throw new Error('Rabbit connection unavaiable');
        channel.publish(
            this.exchange,
            'sale',
            Buffer.from(JSON.stringify(event))
        );
        await channel.waitForConfirms();
        Logger.info(
            `[RabbitSalePublisher] message published on ${
                this.exchange
            } ${JSON.stringify(event)} with routing key sale`
        );
    }
}
