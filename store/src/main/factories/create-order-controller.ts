import { CreateOrderController } from '../../controllers';
import { CreateOrderRepository } from '../../repositories';
import { makeCreateOrder } from './create-order';

export const makeCreateOrderController = (
    orderRepository: CreateOrderRepository
): CreateOrderController => {
    return new CreateOrderController(makeCreateOrder(orderRepository));
};
