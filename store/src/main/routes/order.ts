import { Logger } from '../../../../libs/store-core';
import {
    makeGetOrder,
    makeOrderRepository,
    makeCreateOrder,
    makeCreateOrderController,
    makeGetOrderController
} from '../factories';

import { Router } from 'express';

export default (router: Router): void => {
    const orderRepository = makeOrderRepository();
    const createOrder = makeCreateOrderController(orderRepository);
    router.post('/orders', async (req, res) => createOrder.handle(req, res));

    const getOrders = makeGetOrderController(orderRepository);
    router.get('/orders', async (req, res) => getOrders.handle(req, res));
};
