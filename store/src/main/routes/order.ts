import { Router } from 'express';
import { Logger } from '../../../../libs/store-core';
import { makeCreateOrder } from '../factories/create-order';

export default (router: Router): void => {
    const createOrder = makeCreateOrder();
    router.post('/orders', async (req, res) => {
        try {
            const id = await createOrder.perform(req.body);
            res.status(201).end();
        } catch (error) {
            if (error instanceof Error) Logger.error(error.message);
            res.status(500).json({ message: 'Deu ruim' });
        }
    });
};
