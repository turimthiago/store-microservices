import { Order } from '../models';

export interface CreateOrderRepository {
    createOrder: (order: Order) => Promise<string>;
}
