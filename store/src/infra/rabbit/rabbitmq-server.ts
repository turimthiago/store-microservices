import { connect, Channel, Connection } from "amqplib";

export class RabbitmqServer {
    private connection!: Connection;
    private channel!: Channel;

    constructor(private readonly uri: string) {
        console.log("RabbitmqServer created");
    }

    private async createExchanges(channel: Channel) {
        console.log("[RabbitmqServer] asserting exchanges and queues");
        await channel.assertExchange("sale", "direct", {
            durable: true,
        });
        await channel.assertQueue("sale.work", {
            durable: true,
        });
        await channel.bindQueue("sale.work", "sale", "");
    }

    async start(): Promise<void> {
        console.log("[RabbitmqServer] starting");
        this.connection = await connect(this.uri);
        const channel = await this.connection.createChannel();
        await this.createExchanges(channel);
        await channel.close();
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

    async publish(exchange: string, json: string) {
        const ch = await this.getChannel();
        ch.publish(exchange, "", Buffer.from(json));
    }
}
