import { Router } from 'express';
import { Logger } from '../../../../libs/store-core';
import { makeGetInvoice } from '../factories/get-invoice';
import { makeGetInvoiceController } from '../factories/get-invoice-controller';

export default (router: Router): void => {
    const getInvoiceController = makeGetInvoiceController();
    router.get('/invoices', (req, res) =>
        getInvoiceController.handle(req, res)
    );
};
