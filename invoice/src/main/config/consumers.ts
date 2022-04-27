import { SaleConsumer } from '../../infra/consumers/sale-consumer';
import { Rabbit } from '../../infra/rabbit/rabbit';
import { GenerateInvoice } from '../../services/generate-invoice';
import { invoiceRepository } from './repository';

export const setupConsumers = (rabbit: Rabbit): void => {
    new SaleConsumer(new GenerateInvoice(invoiceRepository), rabbit);
};
