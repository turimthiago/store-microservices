import axios from 'axios';
import { SaleConsumer } from '../../infra/consumers';
import { Rabbit } from '../../infra/rabbit/rabbit';
import { ApiStockRepository } from '../../infra/repositories/api-stock-repository';
import {
    GetInvoiceRepository,
    SaveInvoiceRepository
} from '../../repositories';
import { GenerateInvoice } from '../../services';
import { env } from './env';

type InvoiceRepository = GetInvoiceRepository & SaveInvoiceRepository;

export const setupConsumers = (
    rabbit: Rabbit,
    invoiceRepository: InvoiceRepository
): void => {
    const stockRepository = new ApiStockRepository(env.stockApi.url, axios);
    new SaleConsumer(
        new GenerateInvoice(invoiceRepository, stockRepository),
        rabbit
    );
};
/*
 {
                validateStatus: (status) => {
                    return status < 500;
                }
            }
*/
