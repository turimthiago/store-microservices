import { textChangeRangeIsUnchanged } from 'typescript';

export class Invoice {
    id?: string;
    orderCode: string;
    dtCreated: Date;
    product: string;
    quantity: number;
    total: number;

    constructor({
        id,
        orderCode,
        dtCreated,
        product,
        quantity,
        total
    }: {
        id?: string;
        orderCode: string;
        dtCreated: Date;
        product: string;
        quantity: number;
        total: number;
    }) {
        this.id = id;
        this.orderCode = orderCode;
        this.dtCreated = dtCreated;
        this.product = product;
        this.quantity = quantity;
        this.total = total;
    }
}
