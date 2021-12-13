import { SaleEvent } from "../sale-event";

export class SaleEventBuilder {
    private event: SaleEvent;

    private constructor(
        orderCode: string,
        item: { productCode: string; quantity: number }
    ) {
        this.event = new SaleEvent({
            orderCode,
            product: item.productCode,
            quantity: item.quantity,
        });
    }

    static of(data: any): SaleEventBuilder {
        return new SaleEventBuilder(data, {
            productCode: data.productCode,
            quantity: data.quantity,
        });
    }

    build(): SaleEvent {
        return this.event;
    }
}
