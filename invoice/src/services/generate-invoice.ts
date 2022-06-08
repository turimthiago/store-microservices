import { Logger } from '../../../libs/store-core';
import { DomainError, ProductStockNotFound } from '../errors';
import { Invoice } from '../models';
import { InvoiceItem } from '../models/invoice-item';
import { FindStockProduct } from '../repositories';
import { SaveInvoiceRepository } from '../repositories/invoice-repository';

export class GenerateInvoice {
    constructor(
        private readonly invoiceRepository: SaveInvoiceRepository,
        private readonly stockRepository: FindStockProduct
    ) {}

    async perform({ orderCode, items }: GenerateInvoice.Params): Promise<void> {
        Logger.info(`[GenerateInvoice] generating ${orderCode}`);
        const total = items.reduce(
            (total, item) => total + item.quantity * 1.99,
            0
        );
        const invoiceItems = items.map(
            ({ product, quantity, code }) =>
                new InvoiceItem({ code, product, quantity })
        );
        const invoice = new Invoice({
            dtCreated: new Date(),
            orderCode,
            items: invoiceItems,
            total
        });
        const promisses = items.map(({ code }) =>
            this.stockRepository.findProduct({ code })
        );
        const stockItems = await Promise.all(promisses);
        if (stockItems.some((item) => !item)) {
            throw new ProductStockNotFound(`Product not found at stock`);
        }
        Logger.info(
            `[GenerateInvoice] check stock ${JSON.stringify(stockItems)}`
        );
        stockItems.forEach((item) => {
            if (item) {
                const invoiceItem = invoice.getItem(item.code);
                if (!invoiceItem)
                    throw new DomainError(
                        `Product ${item.code} not found at invoice`
                    );
                if (item.quantity < invoiceItem.quantity)
                    throw new ProductStockNotFound(`Product ${item.code}`);
            }
        });
        await this.invoiceRepository.save(invoice);
    }
}

export namespace GenerateInvoice {
    export type Params = {
        orderCode: string;
        items: { quantity: number; product: string; code: string }[];
    };
}
