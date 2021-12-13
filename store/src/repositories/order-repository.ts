import { Order } from '../../../libs/store-core';
export interface CreateOrderRepository {
    createOrder: (order: Order) => Promise<string>;
}
