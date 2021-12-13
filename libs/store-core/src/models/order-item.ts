export class OrderItem {
    id?: number;
    product: string;
    quantity: number;

    constructor({
        id,
        product,
        quantity,
    }: {
        id?: number;
        product: string;
        quantity: number;
    }) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
    }
}
