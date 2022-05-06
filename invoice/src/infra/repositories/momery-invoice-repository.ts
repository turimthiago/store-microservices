import { Logger } from '../../../../libs/store-core';
import { Invoice } from '../../models';
import {
    GetInvoiceRepository,
    SaveInvoiceRepository
} from '../../repositories/invoice-repository';

export class MemoryInvoiceRepository
    implements SaveInvoiceRepository, GetInvoiceRepository
{
    invoices: Invoice[] = [];
    async get(): Promise<Invoice[]> {
        return this.invoices;
    }

    async save(invoice: Invoice): Promise<void> {
        Logger.info(
            `[MemoryInvoiceRepository] saving invoice ${JSON.stringify(
                invoice
            )}`
        );
        this.invoices.push(invoice);
    }
}
