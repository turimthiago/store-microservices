import { Channel } from 'amqplib';
import { Logger, SaleEvent } from '../../../../libs/store-core/dist';
import { SalePublisher } from '../../services/protocols/sale-publisher';
import { Rabbit, RabbitListener } from '../rabbit/rabbit';

export class RabbitSalePublisher implements RabbitListener, SalePublisher {
    private _channel?: Channel;
    private _rabbit?: Rabbit;

    constructor(rabbit: Rabbit, private readonly exchange: string) {
        rabbit.register(this);
    }

    private async getChannel(): Promise<Channel> {
        if (!this._channel) {
            this._channel = await this._rabbit?.createChannel();
        }
        return this._channel!;
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
        channel.publish(this.exchange, '', Buffer.from(JSON.stringify(event)));
    }
}
