import { RabbitmqServer } from '../../../infra/rabbit/rabbitmq-server';

export const rabbit = new RabbitmqServer('amqp://admin:admin@rabbitmq:5672');
