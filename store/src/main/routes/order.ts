import { Router } from 'express';
import { makeCreateOrder } from '../factories/create-order';

export default (router: Router): void => {
    const createOrder = makeCreateOrder();
    router.post('/orders', async (req, res) => {
        try {
            const id = await createOrder.perform(req.body);
            res.status(200).json({ id: id });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Deu ruim' });
        }
    });
};
