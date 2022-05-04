export class StockItem {
    readonly quantity: number;
    readonly code: string;

    constructor({ code, quantity }: { code: string; quantity: number }) {
        this.quantity = quantity;
        this.code = code;
    }
}
