import { Logger } from '../../../../libs/store-core';
import {
    makeGetOrder,
    makeOrderRepository,
    makeCreateOrder
} from '../factories';

import { Router } from 'express';

export default (router: Router): void => {
    const orderRepository = makeOrderRepository();
    const createOrder = makeCreateOrder(orderRepository);
    router.post('/orders', async (req, res) => {
        try {
            Logger.info(
                `[CreateOrderController] data ${JSON.stringify(req.body)}`
            );
            const { items } = req.body;
            await createOrder.perform({ items });
            res.status(201).end();
        } catch (error) {
            if (error instanceof Error) Logger.error(error.message);
            res.status(500).json({ message: 'Deu ruim' });
        }
    });
    const getOrders = makeGetOrder(orderRepository);
    router.get('/orders', async (req, res) => {
        try {
            const orders = await getOrders.perform();
            res.status(200).json(orders);
        } catch (error) {
            if (error instanceof Error) Logger.error(error.message);
            res.status(500).json({ message: 'Deu ruim' });
        }
    });
};
