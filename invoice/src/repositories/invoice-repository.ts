import { Invoice } from '../models';

export interface SaveInvoiceRepository {
    save: (invoice: Invoice) => Promise<void>;
}

export interface GetInvoiceRepository {
    get: () => Promise<Invoice[]>;
}
