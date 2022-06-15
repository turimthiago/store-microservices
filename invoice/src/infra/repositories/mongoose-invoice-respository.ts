import { Logger } from '../../../../libs/store-core/dist';
import { Invoice, InvoiceItem } from '../../models';
import {
    GetInvoiceRepository,
    SaveInvoiceRepository
} from '../../repositories/invoice-repository';
import InvoiceDocumnent from '../../infra/mongoose/schemas/invoice-entity';

export class MongooseInvoiceRepository
    implements SaveInvoiceRepository, GetInvoiceRepository
{
    invoices: Invoice[] = [];
    async get(): Promise<Invoice[]> {
        Logger.info(`[MongooseInvoiceRepository] geting invoice`);
        const documents = await InvoiceDocumnent.find().exec();
        const invoices = documents.map(
            ({ _id, dtCreated, orderCode, items }) =>
                new Invoice({
                    id: _id.toString(),
                    dtCreated,
                    orderCode,
                    items: items.map(
                        ({ code, product, quantity }) =>
                            new InvoiceItem({ code, product, quantity })
                    )
                })
        );
        return invoices;
    }

    async save(invoice: Invoice): Promise<void> {
        Logger.info(
            `[MongooseInvoiceRepository] saving invoice ${JSON.stringify(
                invoice
            )}`
        );
        await InvoiceDocumnent.create(invoice);
    }
}
