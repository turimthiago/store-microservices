export class OrderItem {
    id?: number;
    code: string;
    product: string;
    quantity: number;

    constructor({
        id,
        code,
        product,
        quantity
    }: {
        id?: number;
        code: string;
        product: string;
        quantity: number;
    }) {
        this.id = id;
        this.code = code;
        this.product = product;
        this.quantity = quantity;
    }
}
