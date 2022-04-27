import { InvoiceItem } from './invoice-item';

export class Invoice {
    id?: string;
    orderCode: string;
    dtCreated: Date;
    total: number;
    items: InvoiceItem[];

    constructor({
        id,
        orderCode,
        dtCreated,
        items,
        total
    }: {
        id?: string;
        orderCode: string;
        dtCreated: Date;
        items: InvoiceItem[];
        total: number;
    }) {
        this.id = id;
        this.orderCode = orderCode;
        this.dtCreated = dtCreated;
        this.items = items;
        this.total = total;
    }
}
