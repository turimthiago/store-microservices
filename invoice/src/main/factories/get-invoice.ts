import { GetInvoice } from '../../services/get-invoice';
import { invoiceRepository } from '../config';

export const makeGetInvoice = (): GetInvoice => {
    return new GetInvoice(invoiceRepository);
};
