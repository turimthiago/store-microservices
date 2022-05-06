import { Router } from 'express';
import { Logger } from '../../../../libs/store-core';
import { makeGetInvoice } from '../factories/get-invoice';

export default (router: Router): void => {
    const getInvoice = makeGetInvoice();
    router.get('/invoices', async (req, res) => {
        try {
            const invoices = await getInvoice.perform();
            res.status(200).json({ invoices });
        } catch (error) {
            if (error instanceof Error) Logger.error(error.message);
            res.status(500).json({ message: 'Deu ruim' });
        }
    });
};
