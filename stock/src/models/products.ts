export class Product {
    id: number;
    code: string;
    quantity: number;
    blocked: boolean;

    constructor({
        id,
        code,
        quantity,
        blocked = false
    }: {
        id: number;
        code: string;
        quantity: number;
        blocked: boolean;
    }) {
        this.id = id;
        this.code = code;
        this.quantity = quantity;
        this.blocked = blocked;
    }
}
