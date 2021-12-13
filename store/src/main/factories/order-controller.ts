import { MemoryOrderRepository } from "../../infra/memory/memory-order-repository";
import { SalePublisher } from "../publishers/sale-publisher";
import { CreateOrder } from "../../services/create-order";
import { env } from "../config/env";
import { rabbit } from "../config/rabbit";

export const makeOrderController = (): any => {
    const producer = new SalePublisher(rabbit, env.exchange.sale.name);
    const memoryRepo = new MemoryOrderRepository();
    return new CreateOrder(memoryRepo, producer);
};
