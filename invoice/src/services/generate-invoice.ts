import { Invoice } from '../models';
import { InvoiceItem } from '../models/invoice-item';
import { SaveInvoiceRepository } from '../repositories/invoice-repository';

export class GenerateInvoice {
    constructor(private readonly invoiceRepository: SaveInvoiceRepository) {}

    async perform({ orderCode, items }: GenerateInvoice.Params): Promise<void> {
        items.map;
        const total = items.reduce(
            (total, item) => total + item.quantity * 1.99,
            0
        );
        const invoiceItems = items.map(
            ({ product, quantity }) => new InvoiceItem({ product, quantity })
        );
        const invoice = new Invoice({
            dtCreated: new Date(),
            orderCode,
            items: invoiceItems,
            total
        });
        this.invoiceRepository.save(invoice);
    }
}

export namespace GenerateInvoice {
    export type Params = {
        orderCode: string;
        items: { quantity: number; product: string }[];
    };
}
