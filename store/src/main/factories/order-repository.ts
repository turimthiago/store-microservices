import { MemoryOrderRepository } from '../../infra/repositories/memory-order-repository';
import { CreateOrderRepository, GetOrdersRepository } from '../../repositories';

type OrderRepository = GetOrdersRepository & CreateOrderRepository;

export const makeOrderRepository = (): OrderRepository =>
    new MemoryOrderRepository();
