import { RabbitSalePublisher } from '../../infra/publishers/sale-publisher';
import { MemoryOrderRepository } from '../../infra/repositories/memory-order-repository';
import { CreateOrder } from '../../services/create-order';
import { env } from '../config/env';
import { rabbit } from '../config/rabbit';

export const makeCreateOrder = (): any => {
    const producer = new RabbitSalePublisher(rabbit, env.exchange.sale.name);
    const memoryRepo = new MemoryOrderRepository();
    return new CreateOrder(memoryRepo, producer);
};
