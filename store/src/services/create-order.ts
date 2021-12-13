import { Order, OrderItem, SaleEvent } from "../../../libs/store-core";
import { SalePublisher } from "../main/publishers/sale-publisher";
import { CreateOrderRepository } from "../repositories";

export class CreateOrder {
    constructor(
        private readonly createOrderRepository: CreateOrderRepository,
        private readonly salePublisher: SalePublisher
    ) {}

    async perform({ product, quantity }: CreateOrder.Params): Promise<string> {
        const item = new OrderItem({ product, quantity });
        const order = new Order({
            item,
        });
        const id = await this.createOrderRepository.createOrder(order);
        const event = new SaleEvent({
            orderCode: id,
            product,
            quantity,
        });
        await this.salePublisher.publish(event);
        return id;
    }
}

export namespace CreateOrder {
    export type Params = {
        product: string;
        quantity: number;
    };
}
