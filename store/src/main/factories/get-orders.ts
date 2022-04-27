import { GetOrdersRepository } from '../../repositories';
import { GetOrders } from '../../services/get-orders';

export const makeGetOrder = (orderRepository: GetOrdersRepository): any => {
    return new GetOrders(orderRepository);
};
