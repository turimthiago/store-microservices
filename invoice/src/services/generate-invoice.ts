import { Invoice } from '../models';
import { SaveInvoiceRepository } from '../repositories/invoice-repository';

export class GenerateInvoice {
    constructor(private readonly invoiceRepository: SaveInvoiceRepository) {}

    async perform({
        orderCode,
        quantity,
        product
    }: GenerateInvoice.Params): Promise<void> {
        const total = quantity * 1.99;
        const invoice = new Invoice({
            dtCreated: new Date(),
            orderCode,
            quantity,
            product,
            total
        });
        this.invoiceRepository.save(invoice);
    }
}

export namespace GenerateInvoice {
    export type Params = {
        orderCode: string;
        quantity: number;
        product: string;
    };
}
