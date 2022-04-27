import { SaleConsumer } from '../../infra/consumers';
import { Rabbit } from '../../infra/rabbit/rabbit';
import {
    GetInvoiceRepository,
    SaveInvoiceRepository
} from '../../repositories';
import { GenerateInvoice } from '../../services';

type InvoiceRepository = GetInvoiceRepository & SaveInvoiceRepository;

export const setupConsumers = (
    rabbit: Rabbit,
    invoiceRepository: InvoiceRepository
): void => {
    new SaleConsumer(new GenerateInvoice(invoiceRepository), rabbit);
};
