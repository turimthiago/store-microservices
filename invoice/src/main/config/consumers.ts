import { SaleConsumer } from '../../infra/consumers/sale-consumer';
import { RabbitmqServer } from '../../infra/rabbit/rabbitmq-server';
import { GenerateInvoice } from '../../services/generate-invoice';
import { invoiceRepository } from './repository';

export const setupConsumers = (rabbit: RabbitmqServer): void => {
    new SaleConsumer(new GenerateInvoice(invoiceRepository), rabbit).start();
};
