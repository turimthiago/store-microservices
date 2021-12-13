import { connect, Channel, Connection } from 'amqplib';

export class RabbitmqServer {
    private connection!: Connection;
    private channel!: Channel;

    constructor(private readonly uri: string) {
        console.log('RabbitmqServer created');
    }

    async start(): Promise<void> {
        this.connection = await connect(this.uri);
    }

    async createChannel(): Promise<Channel> {
        return this.connection.createChannel();
    }

    async getChannel(): Promise<Channel> {
        if (!this.channel) {
            this.channel = await this.createChannel();
        }
        return this.channel;
    }
}
