import { Order } from "./order";

export class Sale {
    paymentMethod: string;
    order: Order;

    constructor({
        paymentMethod,
        order,
    }: {
        paymentMethod: string;
        order: Order;
    }) {
        this.paymentMethod = paymentMethod;
        this.order = order;
    }
}
