import { MemoryInvoiceRepository } from '../../infra/repositories/momery-invoice-repository';
import {
    GetInvoiceRepository,
    SaveInvoiceRepository
} from '../../repositories';

type InvoiceRepository = SaveInvoiceRepository & GetInvoiceRepository;

export const makeOrderRepository = (): InvoiceRepository =>
    new MemoryInvoiceRepository();
