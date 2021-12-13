import { OrderItem } from "./order-item";

export class Order {
    id?: string;
    item: OrderItem;

    constructor({ id, item }: { id?: string; item: OrderItem }) {
        this.id = id;
        this.item = item;
    }
}
