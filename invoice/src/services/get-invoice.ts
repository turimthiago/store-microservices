import { Invoice } from '../models';
import { GetInvoiceRepository } from '../repositories/invoice-repository';

export class GetInvoice {
    constructor(private readonly invoiceRepository: GetInvoiceRepository) {}

    perform(): Promise<Invoice[]> {
        return this.invoiceRepository.get();
    }
}
