import { SaleEvent, SaleItem } from "../sale-event";

export class SaleEventBuilder {
  private event: SaleEvent;

  private constructor(orderCode: string, items: SaleItem[]) {
    this.event = new SaleEvent({
      orderCode,
      items,
    });
  }

  static of(data: any): SaleEventBuilder {
    return new SaleEventBuilder(data.orderCode, data.items);
  }

  build(): SaleEvent {
    return this.event;
  }
}
