import { Router } from 'express';
import { Logger } from '../../../../libs/store-core';
import { ApiStockRepository } from '../../infra/repositories/api-stock-repository';
import { env } from '../config';
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
    const stockRepository = new ApiStockRepository(env.stockApi.url);
    router.get('/health', async (req, res) => {
        try {
            await stockRepository.findProduct({ code: '1' });
            // res.status(200).json({});
        } catch (error) {
            if (error instanceof Error) Logger.error(error.message);
            res.status(500).json({ message: 'Deu ruim' });
        }
    });
};
