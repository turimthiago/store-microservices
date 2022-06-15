import { InvoiceItem } from './invoice-item';

export class Invoice {
    id?: string;
    orderCode: string;
    dtCreated: Date;
    items: InvoiceItem[];

    constructor({
        id,
        orderCode,
        dtCreated,
        items
    }: {
        id?: string;
        orderCode: string;
        dtCreated: Date;
        items: InvoiceItem[];
    }) {
        this.id = id;
        this.orderCode = orderCode;
        this.dtCreated = dtCreated;
        this.items = items;
    }

    getItem(code: string): InvoiceItem | undefined {
        const items = this.items.filter((item) => item.code === code);
        if (items.length === 0) return undefined;
        return items[0];
    }

    get amount(): number {
        return this.items.reduce(
            (total, item) => total + item.quantity * 1.99,
            0
        );
    }
}
