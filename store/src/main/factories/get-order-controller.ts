import { GetOrderController } from '../../controllers';
import { GetOrdersRepository } from '../../repositories';
import { makeGetOrder } from './get-orders';

export const makeGetOrderController = (
    orderRepository: GetOrdersRepository
): GetOrderController => {
    return new GetOrderController(makeGetOrder(orderRepository));
};
