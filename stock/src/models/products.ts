export class Product {
    id: number;
    code: string;
    quantity: number;

    constructor({
        id,
        code,
        quantity
    }: {
        id: number;
        code: string;
        quantity: number;
    }) {
        this.id = id;
        this.code = code;
        this.quantity = quantity;
    }
}
