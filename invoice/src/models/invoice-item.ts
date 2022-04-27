export class InvoiceItem {
    product: string;
    quantity: number;

    constructor({ product, quantity }: { product: string; quantity: number }) {
        this.product = product;
        this.quantity = quantity;
    }
}
