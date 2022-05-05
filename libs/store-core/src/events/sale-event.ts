export class SaleEvent {
  orderCode: string;
  items: SaleItem[];

  constructor({ orderCode, items }: { orderCode: string; items: SaleItem[] }) {
    this.orderCode = orderCode;
    this.items = items;
  }
}

export type SaleItem = {
  code: string;
  product: string;
  quantity: number;
};
