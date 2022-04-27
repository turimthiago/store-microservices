import { Order } from '../models';

export interface CreateOrderRepository {
    createOrder: (order: Order) => Promise<Order>;
}

export interface GetOrdersRepository {
    getOrders: () => Promise<Order[]>;
}
