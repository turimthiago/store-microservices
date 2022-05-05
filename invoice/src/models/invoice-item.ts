export class InvoiceItem {
    code: string;
    product: string;
    quantity: number;

    constructor({
        code,
        product,
        quantity
    }: {
        code: string;
        product: string;
        quantity: number;
    }) {
        this.code = code;
        this.product = product;
        this.quantity = quantity;
    }
}
