export class SaleEvent {
    orderCode: string;
    product: string;
    quantity: number;

    constructor({
        orderCode,
        product,
        quantity,
    }: {
        orderCode: string;
        product: string;
        quantity: number;
    }) {
        this.orderCode = orderCode;
        this.product = product;
        this.quantity = quantity;
    }
}
