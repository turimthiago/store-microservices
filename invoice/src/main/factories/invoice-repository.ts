import { MemoryInvoiceRepository } from '../../infra/repositories/momery-invoice-repository';
import { MongooseInvoiceRepository } from '../../infra/repositories/mongoose-invoice-respository';
import {
    GetInvoiceRepository,
    SaveInvoiceRepository
} from '../../repositories';

type InvoiceRepository = SaveInvoiceRepository & GetInvoiceRepository;

export const makeOrderRepository = (): InvoiceRepository =>
    new MongooseInvoiceRepository();
