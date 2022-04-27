import { OrderItem } from './order-item';

export class Order {
    id?: string;
    items: OrderItem[] = [];

    constructor() {}

    public addItem(item: OrderItem): void {
        this.items.push(item);
    }

    public getItems(): OrderItem[] {
        return this.items;
    }
}
