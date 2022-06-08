import { GetInvoiceController } from '../../controllers';
import { makeGetInvoice } from './get-invoice';

export const makeGetInvoiceController = (): GetInvoiceController => {
    return new GetInvoiceController(makeGetInvoice());
};
