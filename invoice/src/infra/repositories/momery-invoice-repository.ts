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
        console.log(this.invoices);
        return this.invoices;
    }

    async save(invoice: Invoice): Promise<void> {
        this.invoices.push(invoice);
        console.log(this.invoices);
    }
}
