import { Router } from 'express';
import { makeGetInvoice } from '../factories/get-invoice';

export default (router: Router): void => {
    const getInvoice = makeGetInvoice();
    router.get('/invoices', async (req, res) => {
        try {
            const invoices = await getInvoice.perform();
            res.status(200).json({ invoices });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Deu ruim' });
        }
    });
};
