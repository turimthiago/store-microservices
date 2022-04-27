import { RabbitSalePublisher } from '../../infra/publishers/sale-publisher';
import { CreateOrderRepository } from '../../repositories';
import { CreateOrder } from '../../services/create-order';
import { env } from '../config/env';
import { rabbit } from '../config/rabbit';

export const makeCreateOrder = (
    orderRepository: CreateOrderRepository
): CreateOrder => {
    const producer = new RabbitSalePublisher(rabbit, env.exchange.sale.name);
    return new CreateOrder(orderRepository, producer);
};
